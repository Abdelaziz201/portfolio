import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokenAndSetCookie } from "../config/generateTokenAndSetCookie.js";
import {
    sendPasswordResetEmail,
    sendPasswordResetSuccessEmail,
} from "../mailtrap/emails.js";


//verify token
export const verifyToken = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: "No token provided", valid: false });
        }

        const decoded = jwt.verify(token, process.env.jwt_sECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: "User not found", valid: false });
        }

        res.status(200).json({ 
            message: "Token is valid", 
            valid: true,
            user: user 
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired", valid: false });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token", valid: false });
        }
        return res.status(500).json({ message: "Error verifying token", valid: false });
    }
});

//read user
export const signin = asyncHandler(async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ name: username });

    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateTokenAndSetCookie(res, user._id);
    const { password: _password, ...userData } = user.toObject();

    res.status(200).json({
        message: "User signed in successfully",
        user: userData,
        token,
    });
}); 



//create user
export const signup = asyncHandler(async (req, res) => {
    try {
        const {name, email, password} = req.body || {};
        
        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }
        if(!password){
            return res.status(400).json({ message: "Password is required" });
        }
        if(!name){
            return res.status(400).json({ message: "Name is required" });
        }
        
        const useAlreadyExists = await User.findOne({email});
        if(useAlreadyExists){
            return res.status(400).json({ message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({message: "User created successfully"});
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update user
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = { ...req.body };

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (updates.password) {
        if (typeof updates.password !== "string" || updates.password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        updates.password = await bcrypt.hash(updates.password, 10);
    }

    const allowedFields = ["name", "email", "password"];

    allowedFields.forEach((field) => {
        if (updates[field] !== undefined) {
            user[field] = updates[field];
        }
    });

    await user.save();

    const { password, ...userData } = user.toObject();

    res.status(200).json({
        message: "User updated successfully",
        user: userData,
    });
});

//delete user       
export const deleteUser = asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// request password reset
export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body || {};

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(200).json({
            message: "If an account with that email exists, a password reset link has been sent.",
        });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(expiresAt);
    await user.save();

    try {
        await sendPasswordResetEmail(user.email, resetToken);
    } catch (error) {
        console.error("Error sending password reset email:", error);
    }

    res.status(200).json({
        message: "Password reset token generated successfully.",
        resetToken,
    });
});

// reset password using token
export const resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body || {};

    if (!token || !password) {
        return res.status(400).json({ message: "Token and new password are required" });
    }

    if (typeof password !== "string" || password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    try {
        await sendPasswordResetSuccessEmail(user.email);
    } catch (error) {
        console.error("Error sending password reset success email:", error);
    }

    res.status(200).json({ message: "Password has been reset successfully" });
});



//logout
export const logout = asyncHandler(async (req, res) => {
    // Clear the token cookie
    res.cookie("token", "", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0, // Expire immediately
    });

    res.status(200).json({ message: "Logged out successfully" });
});

//forgot password email


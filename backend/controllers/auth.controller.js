import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../config/generateTokenAndSetCookie.js";


export const signup = async (req, res) => {
    const {email, password, name} = req.body;

    try {
        if(!email){
            throw new Error("Email is required");
        }
        if(!password){
            throw new Error("Password is required");
        }
        if(!name){
            throw new Error("Name is required");
        }
        
        const useAlreadyExists = await User.findOne({email});
        if(useAlreadyExists){
            throw new Error("User already exists");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationtokenExpiresAt = Date.now() + 1000 * 60 * 60 * 24;
        
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationtokenExpiresAt,
        });
        await user.save();
        res.status(201).json({message: "User created successfully"});

        //jwt
        generateTokenAndSetCookie(res, user._id);
    }
    catch (error) {
        res.status(500).json({message: error.message});
        console.log(error);
    }
};
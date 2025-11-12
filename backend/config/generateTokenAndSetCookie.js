import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateTokenAndSetCookie = (res, userId) => {
    // Token expires in 30 days (persistent session)
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d", // 30 days
    })

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    })

    return token;
}  
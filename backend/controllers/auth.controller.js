// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import jwt from "jsonwebtoken";
// import { generateTokenAndSetCookie } from "../config/generateTokenAndSetCookie.js";
// import { sendVerificationEmail } from "../mailtrap/emails.js";

// export const signup = async (req, res) => {
    
//         const {name, email, password} = req.body;
//         try{
//         if(!email){
//             throw new Error("Email is required");
//         }
//         if(!password){
//             throw new Error("Password is required");
//         }
//         if(!name){
//             throw new Error("Name is required");
//         }
        
//         const useAlreadyExists = await User.findOne({email});
//         if(useAlreadyExists){
//             throw new Error("User already exists");
//         }
        
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const verificationToken = crypto.randomBytes(32).toString("hex");
//         const verificationtokenExpiresAt = Date.now() + 1000 * 60 * 60 * 24;
        
//         const user = new User({
//             name,
//             email,
//             password: hashedPassword,
//             verificationToken,
//             verificationtokenExpiresAt,
//         });
//         await user.save();
//         res.status(201).json({message: "User created successfully"});

//         //jwt
//         generateTokenAndSetCookie(res, user._id);

//         await sendVerificationEmail(user.email, verificationToken);
//     }
//     catch (error) {
//         res.status(500).json({message: error.message});
//         console.log(error);
//     }
// };
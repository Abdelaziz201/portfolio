import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import aboutMeRouter from "./routes/aboutMe.router.js";
import getInTouchRouter from "./routes/getInTouch.router.js";   
import contactInfoRouter from "./routes/contactInfo.router.js";
import projectsRouter from "./routes/projects.router.js";
import skillsRouter from "./routes/skills.router.js";
import userRouter from "./routes/user.router.js";
import path from "path";
import { fileURLToPath } from "url";
//import authRouter from "./routes/auth.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files from Photos folder
app.use("/api/photos", express.static(path.join(__dirname, "Photos")));

app.use("/api/aboutMe", aboutMeRouter);
app.use("/api/getInTouch", getInTouchRouter);
app.use("/api/contactInfo", contactInfoRouter);       
app.use("/api/projects", projectsRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/users", userRouter);
//app.use("/api/auth", authRouter);

app.listen(PORT, () =>{
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
})
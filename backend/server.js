import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import aboutMeRouter from "./routes/aboutMe.router.js";
import getInTouchRouter from "./routes/getInTouch.router.js";   
import projectsRouter from "./routes/projects.router.js";
import skillsRouter from "./routes/skills.router.js";
import authRouter from "./routes/auth.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



app.use("/api/aboutMe", aboutMeRouter);
app.use("/api/getInTouch", getInTouchRouter);       
app.use("/api/projects", projectsRouter);
app.use("/api/skills", skillsRouter);
//app.use("/api/auth", authRouter);

app.listen(PORT, () =>{
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
})
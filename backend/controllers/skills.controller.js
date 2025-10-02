import Skills from "../models/skills.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";



//read skills
export const getSkills = asyncHandler(async (req, res) => {
    try {
        const skills = await Skills.find();
        res.status(200).json(skills);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});

//create skills
export const createSkills = asyncHandler(async (req, res) => {
    try {
        const { skill } = req.body;
        const skills = await Skills.create({ skill });
        res.status(201).json(skills);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});


//update skills
export const updateSkills = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { skill } = req.body;
        const skills = await Skills.findByIdAndUpdate(id, { skill }, { new: true });
        res.status(200).json(skills);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});

//delete skills
export const deleteSkills = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        await Skills.findByIdAndDelete(id);
        res.status(200).json({ message: "Skills deleted successfully" });
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});
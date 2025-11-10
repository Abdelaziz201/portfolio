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
        // Handle both nested { skill: {...} } and flat { name, level, category } structures
        const skillData = req.body.skill || req.body;
        const skills = await Skills.create({ skill: skillData });
        res.status(201).json(skills);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});


//update skills
export const updateSkills = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // Handle both nested { skill: {...} } and flat { name, level, category } structures
        const skillData = req.body.skill || req.body;
        const skills = await Skills.findByIdAndUpdate(id, { skill: skillData }, { new: true });
        if (!skills) {
            return res.status(404).json({ message: "Skill not found" });
        }
        res.status(200).json(skills);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});

//delete skills
export const deleteSkills = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Skills.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Skill not found" });
        }
        res.status(200).json({ message: "Skill deleted successfully" });
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});
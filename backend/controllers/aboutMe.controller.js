import AboutMe from "../models/aboutMe.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload CV endpoint
export const uploadCV = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    
    const cvUrl = `/api/photos/${req.file.filename}`;
    
    res.status(200).json({ cvUrl: cvUrl });
});

// Delete CV endpoint
export const deleteCV = asyncHandler(async (req, res) => {
    try {
        const { filename } = req.params;
        
        // Extract filename from URL if full path is provided
        const actualFilename = filename.includes('/') ? path.basename(filename) : filename;
        const filePath = path.join(__dirname, '../Photos', actualFilename);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "CV file not found" });
        }
        
        // Delete the file
        fs.unlinkSync(filePath);
        
        // Also remove cvUrl from all aboutMe documents
        await AboutMe.updateMany({}, { $unset: { cvUrl: "" } });
        
        res.status(200).json({ message: "CV deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//read about me
export const getAboutMe = asyncHandler(async (req, res) => {
   try {
    const aboutMe = await AboutMe.find();
    res.status(200).json(aboutMe);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});


//create about me
export const createAboutMe = asyncHandler(async (req, res) => {
    try {
        const { title, firstParagraph, secondParagraph, fisrtGrid, secondGrid, thirdGrid, fourthGrid, fifthGrid, sixthGrid, cvUrl } = req.body;
        const aboutMe = await AboutMe.create({ title, firstParagraph, secondParagraph, fisrtGrid, secondGrid, thirdGrid, fourthGrid, fifthGrid, sixthGrid, cvUrl });
        res.status(201).json(aboutMe);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});

//update about me
export const updateAboutMe = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, firstParagraph, secondParagraph, fisrtGrid, secondGrid, thirdGrid, fourthGrid, fifthGrid, sixthGrid, cvUrl } = req.body;
        const aboutMe = await AboutMe.findByIdAndUpdate(id, { title, firstParagraph, secondParagraph, fisrtGrid, secondGrid, thirdGrid, fourthGrid, fifthGrid, sixthGrid, cvUrl }, { new: true });
        res.status(200).json(aboutMe);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});

//delete about me
export const deleteAboutMe = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        await AboutMe.findByIdAndDelete(id);
        res.status(200).json({ message: "About me deleted successfully" });
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});
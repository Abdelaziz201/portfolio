import AboutMe from "../models/aboutMe.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";



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
        const { title, firstParagraph, secondParagraph, fisrtGrid, secondGrid, thirdGrid, fourthGrid, fifthGrid, sixthGrid } = req.body;
        const aboutMe = await AboutMe.create({ title, firstParagraph, secondParagraph, fisrtGrid, secondGrid, thirdGrid, fourthGrid, fifthGrid, sixthGrid });
        res.status(201).json(aboutMe);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
});

//update about me
export const updateAboutMe = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, firstParagraph, secondParagraph, fisrtGrid, secondGrid, thirdGrid, fourthGrid, fifthGrid, sixthGrid } = req.body;
        const aboutMe = await AboutMe.findByIdAndUpdate(id, { title, firstParagraph, secondParagraph, fisrtGrid, secondGrid, thirdGrid, fourthGrid, fifthGrid, sixthGrid }, { new: true });
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
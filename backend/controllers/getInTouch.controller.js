import GetInTouch from "../models/getInTouch.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";        


//read getInTouch
export const getInTouch = asyncHandler(async (req, res) => {
    try {
    const getInTouch = await GetInTouch.find();
    res.status(200).json(getInTouch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//create getInTouch
export const createInTouch = asyncHandler(async (req, res) => {
    try {
        const getInTouch = await GetInTouch.create(req.body);
        res.status(201).json(getInTouch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    res.status(201).json(getInTouch);
});         

//update getInTouch
export const updateInTouch = asyncHandler(async (req, res) => {
    try {
        const getInTouch = await GetInTouch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(getInTouch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    res.status(200).json(getInTouch);
});

//delete getInTouch
export const deleteInTouch = asyncHandler(async (req, res) => {
    try {
        await GetInTouch.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "GetInTouch deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    res.status(200).json({ message: "GetInTouch deleted successfully" });
});
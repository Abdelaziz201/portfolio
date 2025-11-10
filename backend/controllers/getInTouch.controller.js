import GetInTouch from "../models/getInTouch.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { sendContactFormNotification } from "../mailtrap/emails.js";        


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
});         

//update getInTouch
export const updateInTouch = asyncHandler(async (req, res) => {
    try {
        const getInTouch = await GetInTouch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!getInTouch) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(getInTouch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete getInTouch
export const deleteInTouch = asyncHandler(async (req, res) => {
    try {
        const deleted = await GetInTouch.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//send contact form email notification to admin
export const sendContactEmail = asyncHandler(async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                message: "Name, email, and message are required" 
            });
        }


        // Send email notification to admin
        await sendContactFormNotification(name, email, message);

        res.status(200).json({ 
            message: "Email notification sent successfully" 
        });
    } catch (error) {
        console.error("Error sending contact form email:", error);
        res.status(500).json({ 
            message: error.message || "Failed to send email notification" 
        });
    }
});
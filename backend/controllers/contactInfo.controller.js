import ContactInfo from "../models/contactInfo.model.js";
import asyncHandler from "express-async-handler";

// Get contact information
export const getContactInfo = asyncHandler(async (req, res) => {
    try {
        const contactInfo = await ContactInfo.getContactInfo();
        res.status(200).json(contactInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update contact information
export const updateContactInfo = asyncHandler(async (req, res) => {
    try {
        let contactInfo = await ContactInfo.findOne();
        
        if (!contactInfo) {
            // Create if doesn't exist
            contactInfo = await ContactInfo.create(req.body);
            return res.status(201).json(contactInfo);
        }

        // Update existing
        contactInfo = await ContactInfo.findByIdAndUpdate(
            contactInfo._id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(contactInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


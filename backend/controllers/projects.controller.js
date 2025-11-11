import express from "express";
import Projects from "../models/projects.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//read projects
export const getProjects = asyncHandler(async (req, res) => {
    try {
        const projects = await Projects.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//create projects
export const createProjects = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Handle images - can be from file uploads or URLs
    let images = [];
    if (req.files && req.files.length > 0) {
        // Files uploaded via multer
        images = req.files.map(file => `/api/photos/${file.filename}`);
    } else if (req.body.images) {
        // Images passed as URLs (for existing images or manual URLs)
        images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }
    
    const { title, description, tags, githubUrl, demoUrl } = req.body;
    const parsedTags = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
    
    const project = new Projects({ 
        title, 
        description, 
        images, 
        tags: parsedTags, 
        githubUrl, 
        demoUrl 
    });
    await project.save();
    res.status(201).json(project);
})

//update projects
export const updateProjects = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    
    // Handle images - can be from file uploads or URLs
    let images = [];
    if (req.files && req.files.length > 0) {
        // New files uploaded via multer
        const newImages = req.files.map(file => `/api/photos/${file.filename}`);
        // Merge with existing images if provided
        const existingImages = req.body.existingImages 
            ? (Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages])
            : [];
        images = [...existingImages, ...newImages];
    } else if (req.body.images) {
        // Images passed as URLs
        images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }
    
    const { title, description, tags, githubUrl, demoUrl } = req.body;
    const parsedTags = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
    
    const updateData = { title, description, tags: parsedTags, githubUrl, demoUrl };
    if (images.length > 0) {
        updateData.images = images;
    }
    
    const project = await Projects.findByIdAndUpdate(id, updateData, { new: true });
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
})

//delete projects
export const deleteProjects = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    
    // Find project to get image paths
    const project = await Projects.findById(id);
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    
    // Delete associated images from filesystem
    if (project.images && project.images.length > 0) {
        project.images.forEach(imagePath => {
            // Extract filename from path like /api/photos/filename.jpg
            const filename = imagePath.split('/').pop();
            const filePath = path.join(__dirname, '../Photos', filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    }
    
    await Projects.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted successfully" });
})

// Upload images endpoint
export const uploadImages = asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
    }
    
    const imageUrls = req.files.map(file => ({
        id: file.filename,
        url: `/api/photos/${file.filename}`
    }));
    
    res.status(200).json({ images: imageUrls });
})

// Delete image endpoint
export const deleteImage = asyncHandler(async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../Photos', filename);
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Image not found" });
    }
    
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "Image deleted successfully" });
})

//hi, I want to do the projan i add more projects from the admin page, or delete or whatever i have apis for, but i have a problem now that i did not take photos into account, can u make it so i can upload photos and every photo get an ID and get saved in photos folde
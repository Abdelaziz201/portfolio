import express from "express";
import Projects from "../models/projects.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";


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
    const { title, description, image, tags, githubUrl, demoUrl } = req.body;
    const project = new Projects({ title, description, image, tags, githubUrl, demoUrl });
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
    const { title, description, image, tags, githubUrl, demoUrl } = req.body;
    const project = await Projects.findByIdAndUpdate(id, { title, description, image, tags, githubUrl, demoUrl }, { new: true });
    res.status(200).json(project);
})

//delete projects
export const deleteProjects = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    await Projects.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted successfully" });
})
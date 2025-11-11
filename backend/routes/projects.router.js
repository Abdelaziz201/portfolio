import express from "express";
import { getProjects, createProjects, updateProjects, deleteProjects, uploadImages, deleteImage } from "../controllers/projects.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", upload.array('images', 10), createProjects); // Allow up to 10 images
router.put("/:id", upload.array('images', 10), updateProjects);
router.delete("/:id", deleteProjects);

// Image upload routes
router.post("/upload", upload.array('images', 10), uploadImages);
router.delete("/images/:filename", deleteImage);

export default router;
import express from "express";
import { getProjects, createProjects, updateProjects, deleteProjects, uploadImages, deleteImage, listPhotosInventory } from "../controllers/projects.controller.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.get("/photos-inventory", protect, listPhotosInventory);
router.get("/", getProjects);
router.post("/", upload.array('images', 10), createProjects); // Allow up to 10 images
router.put("/:id", upload.array('images', 10), updateProjects);
router.delete("/:id", deleteProjects);

// Image upload routes
router.post("/upload", upload.array('images', 10), uploadImages);
router.delete("/images/:filename", deleteImage);

export default router;
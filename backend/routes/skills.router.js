import express from "express";
import { getSkills, createSkills, updateSkills, deleteSkills } from "../controllers/skills.controller.js";


const router = express.Router();

router.get("/", getSkills);
router.post("/", createSkills);
router.put("/:id", updateSkills);
router.delete("/:id", deleteSkills);

export default router;
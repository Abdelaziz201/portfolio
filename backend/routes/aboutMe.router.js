import express from "express"
import { getAboutMe, createAboutMe, updateAboutMe, deleteAboutMe } from "../controllers/aboutMe.controller.js";

const router = express.Router();

router.get("/", getAboutMe);
router.post("/", createAboutMe);
router.put("/:id", updateAboutMe);
router.delete("/:id", deleteAboutMe);

export default router;
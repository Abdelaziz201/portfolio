import express from "express"
import { getAboutMe, createAboutMe, updateAboutMe, deleteAboutMe, uploadCV, deleteCV } from "../controllers/aboutMe.controller.js";
import uploadCVMiddleware from "../middleware/uploadCV.js";

const router = express.Router();

router.get("/", getAboutMe);
router.post("/", createAboutMe);
router.put("/:id", updateAboutMe);
router.delete("/:id", deleteAboutMe);
router.post("/upload-cv", uploadCVMiddleware.single('cv'), uploadCV);
router.delete("/delete-cv/:filename", deleteCV);

export default router;
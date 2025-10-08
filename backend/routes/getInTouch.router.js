import express from "express";
import { getInTouch, createInTouch, updateInTouch, deleteInTouch } from "../controllers/getInTouch.controller.js";


const router = express.Router();

router.get("/", getInTouch);
router.post("/", createInTouch);
router.put("/:id", updateInTouch);
router.delete("/:id", deleteInTouch);

export default router;


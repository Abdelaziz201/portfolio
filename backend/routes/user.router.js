import express from "express";
import { signin, signup, updateUser, deleteUser, forgotPassword, resetPassword } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
import express from "express"


const router = express.Router();

router.get("/", getAboutMe);
router.post("/", createAboutMe);
router.put("/:id", updateAboutMe);
router.delete("/:id", deleteAboutMe);

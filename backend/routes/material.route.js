import express from "express";
import { createMaterial, getAllMaterials } from "../controllers/material.controller.js";

const router = express.Router();

router.post("/", createMaterial);
router.get("/", getAllMaterials);

export default router;

import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { createMaterial, deleteMaterial, getAllMaterials, getMaterialById, getMaterialCostSummary, updateMaterial } from "../controllers/material.controller.js";

const materialrouter = express.Router();

materialrouter.post("/", isAuth, createMaterial);
materialrouter.get("/", isAuth, getAllMaterials);
materialrouter.get("/:id", isAuth, getMaterialById);
materialrouter.put("/:id", isAuth, updateMaterial);
materialrouter.delete("/:id", isAuth, deleteMaterial);
materialrouter.get("/summary/cost", isAuth, getMaterialCostSummary);

export default materialrouter;
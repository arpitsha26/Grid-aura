import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { addProjectMaterial, deleteProjectMaterial, getAllProjectMaterials, getProjectMaterialsByProject, updateProjectMaterial } from "../controllers/projectmaterial.controller.js";

const projectmaterialrouter = express.Router();

projectmaterialrouter.post("/", isAuth, addProjectMaterial);
projectmaterialrouter.get("/", isAuth, getAllProjectMaterials);
projectmaterialrouter.get("/:projectId", isAuth, getProjectMaterialsByProject);
projectmaterialrouter.put("/:id", isAuth, updateProjectMaterial);
projectmaterialrouter.delete("/:id", isAuth, deleteProjectMaterial);

export default projectmaterialrouter;
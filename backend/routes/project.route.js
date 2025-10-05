import express from 'express';
import { uploadImage } from '../middlewares/multer.js';
import { addAssetToProject, addMaterialToProject, createProject, deleteProject, getAllProjects, getProjectById, getProjectSummary, updateProject } from '../controllers/project.controller.js';

const projectrouter = express.Router();

projectrouter.post("/", uploadImage.single("image"), createProject);
projectrouter.get("/", getAllProjects);
projectrouter.get("/:id", getProjectById);
projectrouter.put("/:id", uploadImage.single("image"), updateProject);
projectrouter.delete("/:id", deleteProject);


projectrouter.post("/:id/assets", addAssetToProject);
projectrouter.post("/:id/materials", addMaterialToProject);
projectrouter.get("/:id/summary", getProjectSummary);

export default projectrouter;
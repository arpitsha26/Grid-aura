import ProjectMaterial from "../models/projectmaterial.js";
import Project from "../models/project.js";
import Material from "../models/material.js";


export const addProjectMaterial = async (req, res) => {
  try {
    const { project, material, requiredQty, allocatedQty, procuredQty, remarks } = req.body;

    const foundProject = await Project.findById(project);
    const foundMaterial = await Material.findById(material);
    if (!foundProject || !foundMaterial) {
      return res.status(404).json({ message: "Project or Material not found" });
    }

    const newProjectMaterial = await ProjectMaterial.create({
      project,
      material,
      requiredQty,
      allocatedQty,
      procuredQty,
      remarks,
    });

    
    foundProject.materials.push(newProjectMaterial._id);
    await foundProject.save();

    res.status(201).json({
      message: "Project Material added successfully",
      data: newProjectMaterial,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding project material", error: error.message });
  }
};


export const getAllProjectMaterials = async (req, res) => {
  try {
    const projectMaterials = await ProjectMaterial.find()
      .populate("project", "name location")
      .populate("material", "name category unit");

    res.status(200).json(projectMaterials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project materials", error: error.message });
  }
};


export const getProjectMaterialsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const projectMaterials = await ProjectMaterial.find({ project: projectId })
      .populate("material", "name category unit");

    res.status(200).json(projectMaterials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching materials for project", error: error.message });
  }
};


export const updateProjectMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ProjectMaterial.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Project Material not found" });

    res.status(200).json({ message: "Project Material updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating project material", error: error.message });
  }
};


export const deleteProjectMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ProjectMaterial.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Project Material not found" });

    
    await Project.findByIdAndUpdate(deleted.project, { $pull: { materials: id } });

    res.status(200).json({ message: "Project Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project material", error: error.message });
  }
};

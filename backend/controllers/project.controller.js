import Project from "../models/project.js";
import uploadOnCloudinary from "../config/cloudinary.js";


export const createProject = async (req, res) => {
  try {
    const { name, location, budget, startDate, endDate, status } = req.body;

    let imageUrl = "";
    if (req.file) {
      const uploadResponse = await uploadOnCloudinary(req.file.path);
      imageUrl = uploadResponse.secure_url;
    }

    const project = new Project({
      name,
      location,
      budget,
      startDate,
      endDate,
      status,
      image: imageUrl,
    });

    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error creating project" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("assets", "name type location")
      .populate("materials", "material requiredQty allocatedQty");
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error fetching projects" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("assets", "name type location capacity")
      .populate({
        path: "materials",
        populate: { path: "material", select: "name category unit" },
      });

    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Server error fetching project" });
  }
};


export const updateProject = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      const uploadResponse = await uploadOnCloudinary(req.file.path);
      updates.image = uploadResponse.secure_url;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error updating project" });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server error deleting project" });
  }
};


export const addAssetToProject = async (req, res) => {
  try {
    const { assetId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!project.assets.includes(assetId)) {
      project.assets.push(assetId);
      await project.save();
    }

    res.status(200).json({ message: "Asset linked to project", project });
  } catch (error) {
    console.error("Error adding asset:", error);
    res.status(500).json({ message: "Server error adding asset" });
  }
};


export const addMaterialToProject = async (req, res) => {
  try {
    const { materialId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!project.materials.includes(materialId)) {
      project.materials.push(materialId);
      await project.save();
    }

    res.status(200).json({ message: "Material linked to project", project });
  } catch (error) {
    console.error("Error adding material:", error);
    res.status(500).json({ message: "Server error adding material" });
  }
};


export const getProjectSummary = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("assets")
      .populate({
        path: "materials",
        populate: { path: "material", select: "name unit category" },
      });

    if (!project) return res.status(404).json({ message: "Project not found" });

    const summary = {
      projectName: project.name,
      totalAssets: project.assets.length,
      totalMaterials: project.materials.length,
      status: project.status,
      budget: project.budget,
      startDate: project.startDate,
      endDate: project.endDate,
    };

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error generating project summary:", error);
    res.status(500).json({ message: "Server error generating summary" });
  }
};

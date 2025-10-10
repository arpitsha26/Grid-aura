import Material from "../models/material.js";
import Project from "../models/project.js";

export const createMaterial = async (req, res) => {
  try {
    const data = req.body;

    if (!data.code || !data.name || !data.category || !data.unit) {
      return res.status(400).json({ message: "code, name, category and unit are required" });
    }

    // prevent duplicate code
    const exists = await Material.findOne({ code: data.code });
    if (exists) {
      return res.status(409).json({ message: "Material with this code already exists" });
    }

    const material = new Material(data);
    await material.save();

    res.status(201).json({ message: "Material created", material });
  } catch (error) {
    console.error("Error creating material:", error);
    res.status(500).json({ message: "Server error creating material", error: error.message });
  }
};

export const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find({}).sort({ createdAt: -1 });
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ message: "Server error fetching materials", error: error.message });
  }
};

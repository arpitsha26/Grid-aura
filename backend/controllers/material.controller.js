import Material from "../models/material.js";


export const createMaterial = async (req, res) => {
  try {
    const { code, name, category, unit, costPerUnit, description, supplierInfo } = req.body;

    const existing = await Material.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Material with this code already exists" });
    }

    const material = await Material.create({
      code,
      name,
      category,
      unit,
      costPerUnit,
      description,
      supplierInfo,
    });

    res.status(201).json({ message: "Material created successfully", material });
  } catch (error) {
    console.error("Error creating material:", error);
    res.status(500).json({ message: "Error creating material", error: error.message });
  }
};


export const getAllMaterials = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };

    const materials = await Material.find(query).sort({ createdAt: -1 });
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ message: "Error fetching materials", error: error.message });
  }
};


export const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: "Material not found" });

    res.status(200).json(material);
  } catch (error) {
    console.error("Error fetching material:", error);
    res.status(500).json({ message: "Error fetching material", error: error.message });
  }
};


export const updateMaterial = async (req, res) => {
  try {
    const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMaterial) return res.status(404).json({ message: "Material not found" });

    res.status(200).json({ message: "Material updated successfully", material: updatedMaterial });
  } catch (error) {
    console.error("Error updating material:", error);
    res.status(500).json({ message: "Error updating material", error: error.message });
  }
};


export const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: "Material not found" });

    await material.deleteOne();

    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error("Error deleting material:", error);
    res.status(500).json({ message: "Error deleting material", error: error.message });
  }
};


export const getMaterialCostSummary = async (req, res) => {
  try {
    const summary = await Material.aggregate([
      {
        $group: {
          _id: "$category",
          totalMaterials: { $sum: 1 },
          avgCost: { $avg: "$costPerUnit" },
          minCost: { $min: "$costPerUnit" },
          maxCost: { $max: "$costPerUnit" },
        },
      },
    ]);

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching cost summary:", error);
    res.status(500).json({ message: "Error fetching cost summary", error: error.message });
  }
};

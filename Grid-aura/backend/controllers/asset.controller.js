import Asset from "../models/asset.js";
import Project from "../models/project.js";

export const createAsset = async (req, res) => {
  try {
    const assetData = req.body;

   
    const project = await Project.findById(assetData.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newAsset = new Asset(assetData);
    await newAsset.save();
    project.assets.push(newAsset._id);
    await project.save();

    res.status(201).json({
      message: "Asset created successfully",
      asset: newAsset,
    });
  } catch (error) {
    console.error("Error creating asset:", error);
    res.status(500).json({ message: "Error creating asset", error: error.message });
  }
};


export const getAllAssets = async (req, res) => {
  try {
    const { projectId, type } = req.query;
    const query = {};

    if (projectId) query.project = projectId;
    if (type) query.type = type;

    const assets = await Asset.find(query).populate("project", "name location status");
    res.status(200).json(assets);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ message: "Error fetching assets", error: error.message });
  }
};


export const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id).populate("project", "name location status");
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    res.status(200).json(asset);
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ message: "Error fetching asset", error: error.message });
  }
};


export const updateAsset = async (req, res) => {
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedAsset) return res.status(404).json({ message: "Asset not found" });

    res.status(200).json({
      message: "Asset updated successfully",
      asset: updatedAsset,
    });
  } catch (error) {
    console.error("Error updating asset:", error);
    res.status(500).json({ message: "Error updating asset", error: error.message });
  }
};


export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

   
    await Project.findByIdAndUpdate(asset.project, { $pull: { assets: asset._id } });

    await asset.deleteOne();

    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    console.error("Error deleting asset:", error);
    res.status(500).json({ message: "Error deleting asset", error: error.message });
  }
};




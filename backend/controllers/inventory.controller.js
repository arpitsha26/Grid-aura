import Inventory from "../models/inventory.js";
import Material from "../models/material.js";


export const createInventory = async (req, res) => {
  try {
    const { material, location, availableQty, reservedQty } = req.body;

    const materialExists = await Material.findById(material);
    if (!materialExists) return res.status(404).json({ message: "Material not found" });

    const existing = await Inventory.findOne({ material, location });
    if (existing) {
      return res.status(400).json({ message: "Inventory already exists for this material and location" });
    }

    const inventory = new Inventory({ material, location, availableQty, reservedQty });
    await inventory.save();

    res.status(201).json({ message: "Inventory created successfully", inventory });
  } catch (error) {
    res.status(500).json({ message: "Error creating inventory", error: error.message });
  }
};


export const getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find()
      .populate("material", "name category unit")
      .select("material location availableQty reservedQty optimizedData createdAt updatedAt");
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventories", error: error.message });
  }
};



export const getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate("material", "name category unit");
    if (!inventory) return res.status(404).json({ message: "Inventory not found" });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error: error.message });
  }
};


export const updateInventory = async (req, res) => {
  try {
    const updateFields = { ...req.body };
    delete updateFields.optimizedData; 

    const updated = await Inventory.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!updated) return res.status(404).json({ message: "Inventory not found" });
    res.status(200).json({ message: "Inventory updated successfully", inventory: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating inventory", error: error.message });
  }
};



export const deleteInventory = async (req, res) => {
  try {
    const deleted = await Inventory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Inventory not found" });
    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory", error: error.message });
  }
};


export const increaseStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const inventory = await Inventory.findById(id);
    if (!inventory) return res.status(404).json({ message: "Inventory not found" });

    inventory.availableQty += quantity;
    await inventory.save();

    res.status(200).json({ message: "Stock increased successfully", inventory });
  } catch (error) {
    res.status(500).json({ message: "Error increasing stock", error: error.message });
  }
};


export const decreaseStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const inventory = await Inventory.findById(id);
    if (!inventory) return res.status(404).json({ message: "Inventory not found" });

    if (inventory.availableQty < quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    inventory.availableQty -= quantity;
    await inventory.save();

    res.status(200).json({ message: "Stock decreased successfully", inventory });
  } catch (error) {
    res.status(500).json({ message: "Error decreasing stock", error: error.message });
  }
};


export const reserveStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const inventory = await Inventory.findById(id);
    if (!inventory) return res.status(404).json({ message: "Inventory not found" });

    if (inventory.availableQty < quantity)
      return res.status(400).json({ message: "Insufficient available stock to reserve" });

    inventory.availableQty -= quantity;
    inventory.reservedQty += quantity;
    await inventory.save();

    res.status(200).json({ message: "Stock reserved successfully", inventory });
  } catch (error) {
    res.status(500).json({ message: "Error reserving stock", error: error.message });
  }
};


export const releaseReservedStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const inventory = await Inventory.findById(id);
    if (!inventory) return res.status(404).json({ message: "Inventory not found" });

    if (inventory.reservedQty < quantity)
      return res.status(400).json({ message: "Not enough reserved stock to release" });

    inventory.reservedQty -= quantity;
    inventory.availableQty += quantity;
    await inventory.save();

    res.status(200).json({ message: "Reserved stock released successfully", inventory });
  } catch (error) {
    res.status(500).json({ message: "Error releasing stock", error: error.message });
  }
};


export const getOptimizationData = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id)
      .select("material location optimizedData")
      .populate("material", "name");
    if (!inventory) return res.status(404).json({ message: "Inventory not found" });
    res.status(200).json(inventory.optimizedData || { message: "No optimization data yet" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching optimization data", error: error.message });
  }
};

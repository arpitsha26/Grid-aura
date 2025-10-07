
import Project from "../models/project.js";
import Material from "../models/material.js";
import Vendor from "../models/vendor.js";
import ProcurementOrder from "../models/procurementorder.js";


export const createProcurementOrder = async (req, res) => {
  try {
    const { project, material, vendor, quantity, unitPrice, deliveryDate, remarks } = req.body;

    const newOrder = new ProcurementOrder({
      project,
      material,
      vendor,
      quantity,
      unitPrice,
      deliveryDate,
      remarks,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Procurement Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error creating procurement order:", error);
    res.status(500).json({ message: "Error creating procurement order", error: error.message });
  }
};


export const getAllProcurementOrders = async (req, res) => {
  try {
    const orders = await ProcurementOrder.find()
      .populate("project", "name location")
      .populate("material", "name category unit")
      .populate("vendor", "name contact email");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching procurement orders", error: error.message });
  }
};


export const getProcurementOrderById = async (req, res) => {
  try {
    const order = await ProcurementOrder.findById(req.params.id)
      .populate("project", "name location")
      .populate("material", "name category unit")
      .populate("vendor", "name contact email");

    if (!order) return res.status(404).json({ message: "Procurement order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching procurement order", error: error.message });
  }
};


export const getOrdersByProject = async (req, res) => {
  try {
    const orders = await ProcurementOrder.find({ project: req.params.projectId })
      .populate("material", "name unit")
      .populate("vendor", "name email");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project orders", error: error.message });
  }
};


export const updateProcurementOrder = async (req, res) => {
  try {
    const updates = req.body;
    const order = await ProcurementOrder.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!order) return res.status(404).json({ message: "Procurement order not found" });

    res.status(200).json({
      message: "Procurement order updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating procurement order", error: error.message });
  }
};

export const deleteProcurementOrder = async (req, res) => {
  try {
    const deleted = await ProcurementOrder.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Procurement order not found" });

    res.status(200).json({ message: "Procurement order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting procurement order", error: error.message });
  }
};

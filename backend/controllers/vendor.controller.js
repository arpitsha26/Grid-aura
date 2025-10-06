import Vendor from "../models/vendor.js";
import Material from "../models/material.js";


export const createVendor = async (req, res) => {
  try {
    const { name, location, gstNumber, contactPerson, contactEmail, contactPhone, materialsSupplied } = req.body;

    const vendor = new Vendor({
      name,
      location,
      gstNumber,
      contactPerson,
      contactEmail,
      contactPhone,
      materialsSupplied
    });

    await vendor.save();
    res.status(201).json({ message: "Vendor created successfully", vendor });
  } catch (error) {
    res.status(500).json({ message: "Error creating vendor", error: error.message });
  }
};

export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("materialsSupplied", "name category unit");
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendors", error: error.message });
  }
};


export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate("materialsSupplied", "name category unit");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendor", error: error.message });
  }
};


export const updateVendor = async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json({ message: "Vendor updated successfully", vendor: updatedVendor });
  } catch (error) {
    res.status(500).json({ message: "Error updating vendor", error: error.message });
  }
};


export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vendor", error: error.message });
  }
};


export const assignMaterialsToVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { materialIds } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const materials = await Material.find({ _id: { $in: materialIds } });
    if (!materials.length) return res.status(404).json({ message: "No valid materials found" });

    vendor.materialsSupplied.push(...materials.map(m => m._id));
    await vendor.save();

    res.status(200).json({ message: "Materials assigned successfully", vendor });
  } catch (error) {
    res.status(500).json({ message: "Error assigning materials", error: error.message });
  }
};

import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  gstNumber: { type: String },
  contactPerson: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  materialsSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }]
}, { timestamps: true });


const Vendor=mongoose.model("Vendor", vendorSchema);

export default Vendor;

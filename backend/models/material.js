import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  unit: { type: String, required: true },
  costPerUnit: { type: Number, default: 0 },
  description: { type: String },
  supplierInfo: {
    name: { type: String },
    contact: { type: String },
    address: { type: String },
  },
}, { timestamps: true });

const Material = mongoose.model("Material", materialSchema);
export default Material;

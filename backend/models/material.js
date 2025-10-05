import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },   
  category: { type: String, required: true }, 
  unit: { type: String, required: true },   
  description: { type: String },
}, { timestamps: true });


const Material= mongoose.model("Material", materialSchema);
export default Material;

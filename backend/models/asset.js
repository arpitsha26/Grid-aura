import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["Tower", "Substation", "Line", "Transformer", "Other"], 
    required: true 
  },

  location: { type: String, required: true },
  capacity: { type: String },  
}, { timestamps: true });

const Asset=mongoose.model("Asset", assetSchema);

export default Asset

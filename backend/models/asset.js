import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["Tower", "Substation", "Line", "Transformer", "Other"], 
    required: true 
  },

  towerType: { 
    type: String, 
    enum: ["Suspension", "Tension", "Transposition", "Other"], 
    required: function () { return this.type === "Tower"; }
  },

  substationType: { 
    type: String, 
    enum: ["AIS", "GIS", "Hybrid", "Other"], 
    required: function () { return this.type === "Substation"; }
  },

  
  lineType: { 
    type: String, 
    enum: ["HVAC", "HVDC", "Distribution", "Other"], 
    required: function () { return this.type === "Line"; }
  },
  lineLengthKM: { 
    type: Number, 
    required: function () { return this.type === "Line"; } 
  },


  transformer: {
    capacityMVA: { type: Number },
    voltageLevel: { type: String },   
    coolingType: { type: String, enum: ["ONAN", "OFAF", "ODAF", "Other"] },
    manufacturer: { type: String }
  },

  location: { type: String, required: true },
  capacity: { type: String },  
}, { timestamps: true });

const Asset=mongoose.model("Asset", assetSchema);

export default Asset

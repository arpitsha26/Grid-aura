import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true }, 
  budget: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { 
    type: String, 
    enum: ["Planned", "Ongoing", "Completed"], 
    default: "Planned" 
  },
  assets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset" }],
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProjectMaterial" }]
}, { timestamps: true });

const Project= mongoose.model("Project", projectSchema);

export default Project;

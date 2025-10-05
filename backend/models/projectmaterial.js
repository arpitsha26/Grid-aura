import mongoose from "mongoose";

const projectMaterialSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  material: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
  requiredQty: { type: Number, required: true },
  allocatedQty: { type: Number, default: 0 },
}, { timestamps: true });

const ProjectMaterial=mongoose.model("ProjectMaterial", projectMaterialSchema);
export default ProjectMaterial;


import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },             
    description: { type: String },                      
    fileLink: { type: String },                         
    pdfFile: { type: String },                          
    excelFile: { type: String },                        
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    relatedProject: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, 
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;

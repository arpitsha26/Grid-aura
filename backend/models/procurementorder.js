import mongoose from "mongoose";

const procurementOrderSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  material: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  orderDate: { type: Date, default: Date.now },
  quantity: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Approved", "Shipped", "Delivered", "Cancelled"], 
    default: "Pending"  
  }
}, { timestamps: true });

const ProcurementOrder=mongoose.model("ProcurementOrder", procurementOrderSchema);

export default ProcurementOrder;
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  material: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
  location: { type: String, required: true }, 
  availableQty: { type: Number, required: true },
  reservedQty: { type: Number, default: 0 },
  optimizedData: {
      recommendedReorderPoint: { type: Number },
      optimalStockLevel: { type: Number },
      safetyStock: { type: Number },
      comment: { type: String },
      priceTrendInfo: { type: String },
      lastOptimizationDate: { type: Date },
      scenario: { type: String },
    },
}, { timestamps: true });


const Inventory=mongoose.model("Inventory", inventorySchema);

export default Inventory;

import mongoose from "mongoose";

const procurementOrderSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    material: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },

    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date }, 

    quantity: { type: Number, required: true },
    unitPrice: { type: Number }, 
    totalCost: { type: Number }, 

    status: {
      type: String,
      enum: ["Pending", "Approved", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    remarks: { type: String },
  },
  { timestamps: true }
);


procurementOrderSchema.pre("save", function (next) {
  if (this.unitPrice && this.quantity) {
    this.totalCost = this.unitPrice * this.quantity;
  }
  next();
});

const ProcurementOrder = mongoose.model("ProcurementOrder", procurementOrderSchema);
export default ProcurementOrder;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    employeeId: { type: String, unique: true, sparse: true }, 
    email: { type: String, unique: true, required: true },
    phone: { type: String, },

    designation: { type: String }, 
    department: { type: String },  

    joinedDate: { type: Date, default: Date.now },
    activeProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    reportsGenerated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],

    password: { type: String, required: true, },
    role: {
      type: String,
      enum: ["Admin", "ProjectManager", "Engineer", "ProcurementOfficer", "StoreKeeper"],
      default: "Engineer",
    },

    resetPassOtp: { type: String },
    otpExpired: { type: Date },
    isOtpVerified: { type: Boolean, default: false },
    profileImage: {
      type: String,
      default: "",
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

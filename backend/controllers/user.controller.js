import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.js";




export const getProfile = async (req, res) => {
  try {
    console.log("req.userId:", req.userId);
    
    const user = await User.findById(req.user._id)
      .populate("activeProjects", "name status")

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        password: undefined,
        resetPassOtp: undefined,
        otpExpired: undefined,
        isOtpVerified: undefined,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const editProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const allowedUpdates = ["fullName", "email", "phone", "designation", "department"];
    const updates = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined && req.body[key] !== "") {
        updates[key] = req.body[key];
      }
    }

    if (req.file) {
      const cloudImageUrl = await uploadOnCloudinary(req.file.path);
      if (cloudImageUrl) updates.profileImage = cloudImageUrl;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    )
      .populate("activeProjects", "name status")
      .select("-password -resetPassOtp -otpExpired -isOtpVerified");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Edit profile error:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

export const adminUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    
    const allowed = ["role", "employeeId", "designation", "department", "phone", "isActive"];
    const restrictedUpdates = Object.keys(updates).filter((field) => !allowed.includes(field));
    restrictedUpdates.forEach((field) => delete updates[field]);

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully by Admin", user });
  } catch (error) {
    console.error("Admin update user error:", error);
    res.status(500).json({ message: error.message });
  }
};
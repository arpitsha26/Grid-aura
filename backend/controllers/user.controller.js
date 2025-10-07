import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.js";




export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("activeProjects", "name status");

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
    const userId = req.user?._id || req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

  
    const allowedUpdates = [
      "fullName",
      "email",
      "phone",
    ];

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

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};
import generateToken from "../config/generateToken.js";

export const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "Google authentication failed" });
    }

    
    const token = generateToken(req.user._id);

    
    res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        profile:req.user.profileImage
        
      },
    });
  } catch (error) {
    console.error("Google callback error:", error);
    res.status(500).json({ message: error.message });
  }
};

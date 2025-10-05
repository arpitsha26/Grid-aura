import express from "express"
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/admin.js";
import { adminUpdateUser, editProfile, getProfile } from "../controllers/user.controller.js";
import { uploadImage } from "../middlewares/multer.js";

const userrouter=express.Router();

userrouter.get("/profile", isAuth, getProfile);
userrouter.put("/profile", isAuth, uploadImage.single("profileImage"),editProfile);
userrouter.patch("/:id", isAuth, isAdmin, adminUpdateUser);


export default userrouter;
import express from "express"
import { isAuth } from "../middlewares/isAuth.js";

import { editProfile, getProfile } from "../controllers/user.controller.js";
import { uploadImage } from "../middlewares/multer.js";

const userrouter=express.Router();

userrouter.get("/profile", isAuth, getProfile);
userrouter.put("/profile", isAuth, uploadImage.single("profileImage"),editProfile);



export default userrouter;
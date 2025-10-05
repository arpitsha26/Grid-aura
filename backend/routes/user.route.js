import express from "express"
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/admin.js";
import { adminUpdateUser, editProfile, getProfile } from "../controllers/user.controller.js";

const userrouter=express.Router();

userrouter.get("/profile", isAuth, getProfile);
userrouter.put("/profile", isAuth, editProfile);
userrouter.patch("/:id", isAuth, isAdmin, adminUpdateUser);


export default userrouter;
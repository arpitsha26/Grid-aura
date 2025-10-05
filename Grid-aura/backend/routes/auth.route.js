import express from "express"
import { login, resetPassword, sendOtp, signup, verifyOtp } from "../controllers/auth.controller.js";

const authrouter = express.Router();

authrouter.post("/signup", signup);
authrouter.post("/login", login);
authrouter.post("/send-otp", sendOtp);
authrouter.post("/verify-otp", verifyOtp);
authrouter.post("/reset-password", resetPassword);
    

export default authrouter;
    import express from "express";
    import passport from "passport";
    import { googleCallback } from "../controllers/googleAuth.controller.js";
    


    const googlerouter = express.Router();

    googlerouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
    );


    googlerouter.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    googleCallback
    );

    export default googlerouter;
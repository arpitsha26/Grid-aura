import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFromUrlToCloudinary = async (imageUrl) => {
  try {
   
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const response = await axios({
      url: imageUrl,
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data);
    const tempPath = path.join(tempDir, `google_${Date.now()}.jpg`);
    fs.writeFileSync(tempPath, buffer);

   
    const uploadResult = await cloudinary.uploader.upload(tempPath, {
      folder: "user_profiles",
    });

    
    fs.unlinkSync(tempPath);

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    return null;
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/api/gr/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email)
          return done(new Error("Email not found in Google profile"), null);

        let user = await User.findOne({ email });

        
        if (!user) {
          let cloudImageUrl = null;

          if (profile.photos && profile.photos.length > 0) {
           
            const googlePhotoUrl = profile.photos[0].value.replace(/=s\d+-c$/, "=s400-c");
            cloudImageUrl = await uploadFromUrlToCloudinary(googlePhotoUrl);
          }

          user = await User.create({
            fullName: profile.displayName,
            email,
            password: "google-oauth",
            phone: "",
            profileImage: cloudImageUrl || "",
          });
        } 
      
        else if (!user.profileImage && profile.photos?.length > 0) {
          const googlePhotoUrl = profile.photos[0].value.replace(/=s\d+-c$/, "=s400-c");
          const cloudImageUrl = await uploadFromUrlToCloudinary(googlePhotoUrl);
          if (cloudImageUrl) {
            user.profileImage = cloudImageUrl;
            await user.save();
          }
        }

        return done(null, user);
      } catch (error) {
        console.error("Google OAuth error:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

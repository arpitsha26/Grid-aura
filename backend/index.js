import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./config/db.js"
import session from "express-session";
import authrouter from "./routes/auth.route.js";
import userrouter from "./routes/user.route.js";
import googlerouter from "./routes/googleAuth.route.js";
import passport from "passport";
import "./config/googleAuth.js";


import Project from "./models/project.js";




dotenv.config()

const app=express();

const port=process.env.PORT || 5000


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/auth", authrouter)
app.use("/api/user", userrouter)
app.use("/api/gr", googlerouter)

app.use(passport.initialize());
app.use(passport.session());


const startServer = async () => {
  await connectDb();

  app.listen(port, () => {
    console.log(`🚀 Server started on port: ${port}`);
  });
};

startServer();


import express, { json } from "express";
import pkg from "mongoose";
import cors from "cors";
import imagesRouter from "./routes/images.js";
import passport from "passport";
import session from "express-session";
import path from 'path';
import userRoutes from "./routes/users.js";
import { Strategy as LocalStrategy } from "passport-local";

const app = express();
const { connect, connection } = pkg;

// Middleware
app.use(cors());
app.use(json());

// Connect to MongoDB
connect("mongodb://localhost:27017/gallery", {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use("/api/images", imagesRouter);
app.use("/api/users", userRoutes);




// Serve static files
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use("/uploads", express.static(__dirname + "/uploads"));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

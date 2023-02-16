import express, { json } from "express";
import pkg from "mongoose";
import { extname } from "path";
import cors from "cors";
import multer, { diskStorage } from "multer";
import imagesRouter from "./routes/images.js";
import passport from "passport";
import session from "express-session";
import path from 'path';

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

// Multer storage configuration
const storage = diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`);
  },
  encoding: "base64",
});

// Multer upload middleware
const upload = multer({ storage });

// Routes
app.use("/api/images", imagesRouter);

// Image upload route
app.post("/api/upload", upload.single("img"), (req, res) => {
  res.json({
    success: true,
    file: req.file,
  });
});

// Serve static files
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use("/uploads", express.static(__dirname + "/uploads"));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express, { json } from "express";
import serveStatic from "serve-static";
import pkg from "mongoose";
import { extname, dirname, join } from "path";
import cors from "cors";
import multer, { diskStorage } from "multer";
import imagesRouter from "./routes/images.js";
import { fileURLToPath } from "url";


const app = express();
const { connect, connection } = pkg;


// Middleware
app.use(cors());
app.use(json());

// Connect to MongoDB
connect("mongodb://localhost:27017/gallery", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Multer storage configuration
const storage = diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`);
  },
});

// Multer upload middleware
const upload = multer({ storage });

// Routes
app.use("/api/images", imagesRouter);

// Image upload route
app.post("/api/upload", upload.single("image"), (req, res) => {
  res.json({
    success: true,
    file: req.file,
  });
});

// Serve static files
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(serveStatic(join(__dirname, "client", "build")));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

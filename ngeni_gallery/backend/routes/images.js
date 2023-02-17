import express from "express";
import path from "path";
import multer, { diskStorage } from "multer";
import Image from "../models/images.js";
import { extname } from "path";

const imagesRouter = express.Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

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

// Upload image
imagesRouter.post("/", upload.single("img"), async (req, res) => {
  try {
    const { title, desc } = req.body;

    const newImage = new Image({
      title,
      desc,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newImage.save();

    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

imagesRouter.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Get all images
imagesRouter.get("/", async (req, res) => {
  try {
    const images = await Image.find();

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single image
imagesRouter.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update image
imagesRouter.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const { title, desc } = req.body;

    let updatedFields = {
      title,
      desc,
    };

    if (req.file) {
      updatedFields.img = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const image = await Image.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ message: "Image updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete image
imagesRouter.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all images with user information (superuser only)
imagesRouter.get("/users", async (req, res) => {
  try {
    // Check if user is superuser
    if (!req.user.is_superuser) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const images = await Image.find().populate("user", "username email");

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default imagesRouter;

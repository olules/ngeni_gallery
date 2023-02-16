import express from "express";
import path from "path";
import multer from "multer";
import Image  from "../models/images.js";

const imagesRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload image
imagesRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    const newImage = new Image({
      title,
      description,
      imageUrl: `uploads/${req.file.filename}`,
    });

    await newImage.save();

    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

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
imagesRouter.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    let updatedFields = {
      title,
      description,
    };

    if (req.file) {
      updatedFields.imageUrl = `uploads/${req.file.filename}`;
    }

    const image = await Image.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

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



export default imagesRouter

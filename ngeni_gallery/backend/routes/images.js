const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Image = require("../models/image");

// Upload image
router.post("/", upload.single("image"), async (req, res) => {
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

// Update image
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;

    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    image.title = title || image.title;
    image.description = description || image.description;

    await image.save();

    res.json({ message: "Image updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete image
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await image.remove();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = imagesRouter;

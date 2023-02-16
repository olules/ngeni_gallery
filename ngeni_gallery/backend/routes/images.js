import express from "express";
import path from "path";
import multer from "multer";
import Image from "../models/images.js";

const imagesRouter = express.Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Upload image
imagesRouter.post("/", upload.single("img"), async (req, res) => {
  try {
    const { title, desc } = req.body;

    const newImage = new Image({
      title,
      desc,
      imageUrl: `uploads/${req.file.filename}`,
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
      updatedFields.imageUrl = `uploads/${req.file.filename}`;
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

export default imagesRouter;

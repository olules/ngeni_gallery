import { Router } from "express";
import passport from "passport";
import User from "../models/User.js";

const userRoutes = Router();

// Login route
userRoutes.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    const user = req.user;
    const { role } = user;

    // Check user role and redirect accordingly
    if (role === "superuser") {
      res.redirect("/images/users");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout route
userRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Signup route
userRoutes.post("/signup", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if user is superuser
    if (!req.user?.is_superuser) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users route (for superuser only)
userRoutes.get("/", async (req, res) => {
  try {
    // Check if user is superuser
    if (!req.user?.is_superuser) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default userRoutes;

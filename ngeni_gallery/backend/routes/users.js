import { Router } from "express";
import { hash } from "bcrypt";
import User from "../models/User.js";
import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";


const userRoutes = Router();

passport.serializeUser(function (user, done) {
  done(null, user._id);
  // if you use Model.id as your idAttribute maybe you'd want
  // done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);
// Login route
userRoutes.post("/login", (req, res, next) => {
  // Use passport middleware to authenticate user
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: "Login successful" });
    });
  })(req, res, next);
});

// Logout route
userRoutes.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout successful" });
});

// Create user route
userRoutes.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
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
    if (!req.user.is_superuser) {
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

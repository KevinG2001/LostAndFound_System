const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");
const authenticate = require("../middleware/authenticate");
const permit = require("../middleware/authorize");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Login request received:", { username, password });

  if (!username || !password) {
    console.log("Missing username or password");
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const user = await User.findOne({ Username: username.trim() });
    console.log("User found:", user ? true : false);

    if (!user) {
      console.log(`No user found with username: ${username}`);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.Password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log(
        "Password does not match for user:",
        username,
        password,
        user.Password
      );
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const roleDoc = await Role.findOne({ name: user.role });
    console.log("Role document:", roleDoc);
    const permissions = roleDoc ? roleDoc.permissions : [];

    const token = jwt.sign(
      { id: user._id, username: user.Username, role: user.role, permissions },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful, sending response");

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.Username,
        firstname: user.Firstname,
        surname: user.Surname,
        company: user.Company,
        location: user.Location,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET USER LIST
router.get("/list", authenticate, permit("create_user"), async (req, res) => {
  try {
    const users = await User.find({}, "-Password");

    const formattedUsers = users.map((u) => ({
      userId: u._id.toString(),
      Username: u.Username,
      Firstname: u.Firstname,
      Surname: u.Surname,
      role: u.role,
      permissions: u.permissions || [],
    }));

    res.json(formattedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE
router.delete(
  "/delete",
  authenticate,
  permit("create_user"),
  async (req, res) => {
    try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "No user IDs provided" });
      }

      const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

      if (req.user && ids.includes(req.user.id)) {
        return res
          .status(400)
          .json({ message: "You cannot delete your own account" });
      }

      const result = await User.deleteMany({ _id: { $in: objectIds } });

      res.json({
        message: `${result.deletedCount} user(s) deleted successfully`,
      });
    } catch (err) {
      console.error("Error deleting users:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// CREATE USER
router.post(
  "/create",
  authenticate,
  permit("create_user"),
  async (req, res) => {
    try {
      const {
        Username,
        Firstname,
        Surname,
        Company,
        Location,
        Password,
        Role,
      } = req.body;

      if (
        !Username ||
        !Firstname ||
        !Surname ||
        !Company ||
        !Location ||
        !Password ||
        !Role
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ Username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(Password.trim(), 10);

      const maxUser = await User.findOne().sort({ userId: -1 }).lean();
      const newUserId =
        maxUser && maxUser.userId ? Number(maxUser.userId) + 1 : 1;

      const newUser = new User({
        Username: Username.trim(),
        Firstname: Firstname.trim(),
        Surname: Surname.trim(),
        Company: Company.trim(),
        Location: Location.trim(),
        Password: hashedPassword,
        role: Role.trim(),
        userId: newUserId,
      });

      await newUser.save();

      res.status(201).json({
        message: "User created successfully",
        user: {
          userId: newUser.userId,
          Username: newUser.Username,
          Firstname: newUser.Firstname,
          Surname: newUser.Surname,
          Company: newUser.Company,
          Location: newUser.Location,
          Role: newUser.Role,
        },
      });
    } catch (err) {
      console.error("Error creating user:", err);
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ message: "Duplicate userId or username" });
      }
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;

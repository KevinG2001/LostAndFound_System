const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const user = await User.findOne({ Username: username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    //! Checking hashed password (Need to add hashing)
    // const isMatch = await bcrypt.compare(password, user.Password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid username or password" });
    // }
    if (user.Password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const role = await Role.findOne({ name: user.role });
    const permissions = role ? role.permissions : [];

    const token = jwt.sign(
      {
        id: user._id,
        username: user.Username,
        role: user.role,
        permissions,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");

//! Make password hashed
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

    if (user.Password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.Username,
        firstname: user.Firstname,
        surname: user.Surname,
        company: user.Company,
        location: user.Location,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

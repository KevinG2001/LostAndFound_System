const express = require("express");
const router = express.Router();
const Garage = require("../models/Garage");

router.get("/list", async (req, res) => {
  try {
    const garages = await Garage.find();
    res.status(200).json(garages);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching garages",
      error: error.message,
    });
  }
});

module.exports = router;

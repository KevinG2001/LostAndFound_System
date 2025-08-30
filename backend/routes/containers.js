const express = require("express");
const multer = require("multer");
const Container = require("../models/Container");
const router = express.Router();

router.post("/createcontainer", async (req, res) => {
  const { containerID, dateCreated, listOfItemID, AmountFfItems } = req.body;
});

router.get("/list", async (req, res) => {
  try {
    const containers = await Container.find();
    res.status(200).json(containers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching containers", error: err });
  }
});
module.exports = router;

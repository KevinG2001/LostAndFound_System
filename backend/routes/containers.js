// routes/containers.js
const express = require("express");
const Container = require("../models/Container");
const Item = require("../models/Item");
const router = express.Router();
const { formatItemDates } = require("../util/dateFormatter");

// Create container
router.post("/create", async (req, res) => {
  try {
    const { listOfItemID } = req.body;

    // Generate new container ID
    const lastContainer = await Container.findOne().sort({ createdAt: -1 });
    let newNumber = 1;
    if (lastContainer?.containerID) {
      const lastNum = parseInt(
        lastContainer.containerID.replace("CONT", ""),
        10
      );
      newNumber = lastNum + 1;
    }
    const containerID = `CONT${String(newNumber).padStart(3, "0")}`;

    // Create container
    const newContainer = new Container({
      containerID,
      dateCreated: new Date(),
      listOfItemID,
      AmountOfItems: listOfItemID.length,
    });

    await newContainer.save();

    res.status(201).json(newContainer);
  } catch (err) {
    console.error("Error creating container:", err);
    res.status(500).json({ message: "Error creating container", error: err });
  }
});

// List containers with full item info
router.get("/list", async (req, res) => {
  try {
    const containers = await Container.find();

    const populatedContainers = await Promise.all(
      containers.map(async (c) => {
        const items = await Item.find({ itemID: { $in: c.listOfItemID } });
        return {
          ...c.toObject(),
          items: items.map((item) => formatItemDates(item)),
        };
      })
    );

    res.status(200).json(populatedContainers);
  } catch (err) {
    console.error("Error fetching containers:", err);
    res.status(500).json({ message: "Error fetching containers", error: err });
  }
});

module.exports = router;

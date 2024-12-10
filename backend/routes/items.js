const express = require("express");
const Item = require("../models/Item");
const router = express.Router();
const { getNextId } = require("../util/idGenerator");
const { formatItemDates } = require("../util/dateFormatter");

router.post("/create", async (req, res) => {
  const { description, category, type, route, garage, notes, dateLost } =
    req.body;

  console.log("Request received:", req.body);

  try {
    const itemID = await getNextId(type);

    // Create a new item with the provided fields
    const newItem = new Item({
      description,
      category,
      type,
      route,
      garage,
      notes,
      dateLost,
      status: "Unclaimed",
      itemID,
    });

    const savedItem = await newItem.save();

    console.log("Item saved:", savedItem);

    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error saving item:", error);

    res
      .status(500)
      .json({ message: "Error creating item", error: error.message });

    console.log("Item not saved");
  }
});

router.get("/list", async (req, res) => {
  try {
    const items = await Item.find();
    const formattedItems = items.map(formatItemDates);
    res.status(200).json(formattedItems);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching items",
      error: error.message,
    });
  }
});

module.exports = router;

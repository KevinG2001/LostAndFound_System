const express = require("express");
const Item = require("../models/Item");
const router = express.Router();
const { getNextId } = require("../util/idGenerator");
const { formatItemDates } = require("../util/dateFormatter");

// Existing route for creating items (unchanged)
router.post("/create", async (req, res) => {
  const { description, category, type, route, garage, notes, dateLost } =
    req.body;
  console.log("Request received:", req.body);

  try {
    const itemID = await getNextId(type);
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

// Route to get a list of items (unchanged)
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

router.put("/update/:itemID", async (req, res) => {
  const { itemID } = req.params;

  const {
    description,
    category,
    type,
    route,
    garage,
    notes,
    dateLost,
    status,
  } = req.body;

  try {
    const updatedItem = await Item.findOneAndUpdate(
      { itemID },
      { description, category, type, route, garage, notes, dateLost, status },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating item", error: error.message });
  }
});

module.exports = router;

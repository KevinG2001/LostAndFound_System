const express = require("express");
const Item = require("../models/Item");
const router = express.Router();
const { getNextId } = require("../util/idGenerator");
const { formatItemDates } = require("../util/dateFormatter");

router.post("/create", async (req, res) => {
  const { description, category, type, route, garage, notes, dateLost } =
    req.body;

  try {
    const itemID = await getNextId(category);

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
    console.log(itemID);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error saving item:", error);
    res
      .status(500)
      .json({ message: "Error creating item", error: error.message });
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

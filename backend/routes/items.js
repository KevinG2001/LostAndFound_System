const express = require("express");
const Item = require("../models/Item"); // Import the Item model
const router = express.Router();
const { getNextId } = require("../util/idGenerator");
const dayjs = require("dayjs");

router.post("/create", async (req, res) => {
  const { description, category, type, route, garage, notes, dateLost } =
    req.body;
  console.log("Request received:", req.body);

  try {
    const itemID = await getNextId(type);
    const newItem = new Item({
      description,
      type,
      category,
      route,
      garage,
      notes,
      dateLost,
      itemID,
    });

    const savedItem = await newItem.save();
    console.log("Item saved:", savedItem);
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

    // Format dates using dayjs
    const formattedItems = items.map((item) => {
      // Convert the Mongoose document to a plain object
      const plainItem = item.toObject();

      return {
        ...plainItem,
        dateLost: dayjs(plainItem.createdAt).format("DD-MM-YYYY"), // Example format
        updatedAt: dayjs(plainItem.updatedAt).format("DD-MM-YYYY"), // Example format
      };
    });

    res.status(200).json(formattedItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({
      message: "Error fetching items",
      error: error.message,
    });
  }
});

router.get("/count", async (req, res) => {
  try {
    const itemCount = await Item.countDocuments({}, { hint: "_id_" });
    const returnedCount = await Item.countDocuments({ status: "Returned" });
    const lostItemCount = await Item.countDocuments({ status: "Lost" });

    res.status(200).json({
      success: true,
      itemCounts: { itemCount, returnedCount, lostItemCount },
    });
  } catch (error) {
    console.error("Error counting items", error);
    res
      .status(500)
      .json({ message: "Error counting items", error: error.message });
  }
});

module.exports = router;

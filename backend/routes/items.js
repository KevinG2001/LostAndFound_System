const express = require("express");
const multer = require("multer");
const Item = require("../models/Item");
const router = express.Router();
const { getNextId } = require("../util/idGenerator");
const { formatItemDates } = require("../util/dateFormatter");
const { uploadFileToS3 } = require("../util/s3Uploader");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/create", upload.single("image"), async (req, res) => {
  const {
    article,
    description,
    category,
    type,
    route,
    garage,
    notes,
    dateLost,
    status,
  } = req.body;

  if (!article || !description || !dateLost) {
    return res.status(400).json({
      message:
        "Validation failed: article, description, and dateLost are required",
    });
  }

  try {
    const itemID = await getNextId(category);
    let imageUrl = "";

    if (req.file) {
      imageUrl = await uploadFileToS3(
        req.file.buffer,
        req.file.originalname,
        itemID,
        req.file.mimetype
      );
    }

    const newItem = new Item({
      article,
      description,
      category,
      type,
      route,
      garage,
      notes,
      dateLost,
      status,
      itemID,
      imageUrl,
    });

    const savedItem = await newItem.save();
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
    article,
    description,
    category,
    type,
    route,
    garage,
    notes,
    dateLost,
    status,
    imageUrl,
    collectionDetails,
  } = req.body;

  try {
    const updateFields = {
      article,
      description,
      category,
      type,
      route,
      garage,
      notes,
      status,
      imageUrl,
    };

    if (collectionDetails) {
      updateFields.collectionDetails = collectionDetails;
    }

    if (dateLost) {
      if (!isNaN(Date.parse(dateLost))) {
        updateFields.dateLost = new Date(dateLost);
      } else {
        return res.status(400).json({
          message: "Invalid date format for dateLost. Use 'YYYY-MM-DD'.",
        });
      }
    }

    const updatedItem = await Item.findOneAndUpdate({ itemID }, updateFields, {
      new: true,
    });

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

router.post("/search", async (req, res) => {
  const { filters } = req.body;

  try {
    let criteria = {};

    for (const [key, value] of Object.entries(filters)) {
      if (value.trim() !== "") {
        criteria[key] = {
          $regex: new RegExp(value, "i"),
        };
      }
    }

    const items = await Item.find(criteria);
    const formattedItems = items.map((item) => formatItemDates(item));

    res.status(200).json({
      success: true,
      items: formattedItems,
    });
  } catch (error) {
    console.error("Error searching for items", error);
    res.status(500).json({
      success: false,
      message: "Error searching for items",
      error: error.message,
    });
  }
});

router.get("/metadata", async (req, res) => {
  try {
    const categories = await Item.distinct("category");
    const types = await Item.distinct("type");
    const articles = await Item.distinct("article");
    res.status(200).json({ categories, types, articles });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching metadata", error: err.message });
  }
});

module.exports = router;

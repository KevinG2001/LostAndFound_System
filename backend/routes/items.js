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
    description,
    category,
    type,
    route,
    garage,
    notes,
    dateLost,
    status,
  } = req.body;

  if (!description || !dateLost) {
    return res
      .status(400)
      .json({ message: "Validation failed: description, dateLost" });
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
  console.log("Update Backend", req.body);
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
    imageUrl,
  } = req.body;

  try {
    let formattedDateLost = null;

    if (dateLost && !isNaN(Date.parse(dateLost))) {
      formattedDateLost = new Date(dateLost);
    } else {
      return res.status(400).json({
        message: "Invalid date format for dateLost. Use 'YYYY-MM-DD'.",
      });
    }

    const updatedItem = await Item.findOneAndUpdate(
      { itemID },
      {
        description,
        category,
        type,
        route,
        garage,
        notes,
        dateLost: formattedDateLost,
        status,
        imageUrl,
      },
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

router.post("/search", async (req, res) => {
  const { filters } = req.body;

  try {
    let criteria = {};

    //Takes apart criteria, loops over them, trims and makessure if a space is empty it isnt searched
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

module.exports = router;

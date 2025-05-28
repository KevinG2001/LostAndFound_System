const express = require("express");
const multer = require("multer");
const Item = require("../models/Item");
const router = express.Router();
const { getNextId } = require("../util/idGenerator");
const { formatItemDates } = require("../util/dateFormatter");
const { uploadFileToS3, deleteFileFromS3 } = require("../util/s3Uploader");

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
      historyDetails: [
        {
          action: "Created",
          date: new Date(),
          by: "system",
          changes: {
            description: { from: null, to: description },
            category: { from: null, to: category },
            type: { from: null, to: type },
            route: { from: null, to: route },
            garage: { from: null, to: garage },
            notes: { from: null, to: notes },
            dateLost: { from: null, to: dateLost },
            status: { from: null, to: status },
          },
        },
      ],
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
    updatedBy,
    dateClaimed,
  } = req.body;

  try {
    const item = await Item.findOne({ itemID });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

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

    const changes = {};

    for (const key in updateFields) {
      if (updateFields[key] !== undefined && item[key] !== updateFields[key]) {
        changes[key] = { from: item[key], to: updateFields[key] };
        item[key] = updateFields[key];
      }
    }

    if (collectionDetails) {
      changes["collectionDetails"] = {
        from: item.collectionDetails || {},
        to: collectionDetails,
      };
      item.collectionDetails = collectionDetails;
    }

    if (dateLost) {
      if (!isNaN(Date.parse(dateLost))) {
        const parsedDate = new Date(dateLost);
        if (
          !item.dateLost ||
          item.dateLost.toISOString() !== parsedDate.toISOString()
        ) {
          changes["dateLost"] = { from: item.dateLost, to: parsedDate };
          item.dateLost = parsedDate;
        }
      } else {
        return res.status(400).json({
          message: "Invalid date format for dateLost. Use 'YYYY-MM-DD'.",
        });
      }
    }

    if (dateClaimed) {
      if (!isNaN(Date.parse(dateClaimed))) {
        const parsedClaimed = new Date(dateClaimed);
        if (
          !item.dateClaimed ||
          item.dateClaimed.toISOString() !== parsedClaimed.toISOString()
        ) {
          changes["dateClaimed"] = {
            from: item.dateClaimed,
            to: parsedClaimed,
          };
          item.dateClaimed = parsedClaimed;
        }
      } else {
        return res.status(400).json({
          message:
            "Invalid date format for dateClaimed. Use ISO string or 'YYYY-MM-DD'.",
        });
      }
    }

    if (Object.keys(changes).length > 0) {
      item.historyDetails.push({
        action: "Updated",
        date: new Date(),
        by: updatedBy || "System",
        changes,
      });
    }

    const savedItem = await item.save();
    res.status(200).json(savedItem);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      message: "Error updating item",
      error: error.message,
    });
  }
});

router.post("/search", async (req, res) => {
  const { filters } = req.body;

  try {
    let criteria = {};

    if (filters.startDate) {
      criteria["dateLost"] = { $gte: new Date(filters.startDate) };
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      criteria["dateLost"] = {
        ...criteria["dateLost"],
        $lte: endDate,
      };
    }

    for (const [key, value] of Object.entries(filters)) {
      if (value.trim() !== "" && key !== "startDate" && key !== "endDate") {
        criteria[key] = { $regex: new RegExp(value, "i") };
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

// Upload an image and update imageUrl for a specific item
router.post("/file/upload", upload.single("image"), async (req, res) => {
  const { itemID } = req.body;

  if (!itemID) {
    return res.status(400).json({ message: "Missing itemID in request body" });
  }

  try {
    const item = await Item.findOne({ itemID }); // ✅ custom ID

    if (!item) {
      return res
        .status(404)
        .json({ message: "Item not found with itemID: " + itemID });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const imageUrl = await uploadFileToS3(
      req.file.buffer,
      req.file.originalname,
      itemID,
      req.file.mimetype
    );

    item.imageUrl = imageUrl;

    item.historyDetails.push({
      action: "Image Uploaded",
      date: new Date(),
      by: "System",
      changes: {
        imageUrl: { from: null, to: imageUrl },
      },
    });

    await item.save();

    res.status(200).json({ success: true, imageUrl });
  } catch (err) {
    console.error("Image upload error:", err);
    res
      .status(500)
      .json({ message: "Image upload failed", error: err.message });
  }
});

router.delete("/file/delete/:itemID", async (req, res) => {
  const { itemID } = req.params;

  try {
    const item = await Item.findOne({ itemID });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (!item.imageUrl) {
      return res.status(400).json({ message: "No image to delete" });
    }

    // Delete from S3
    await deleteFileFromS3(item.imageUrl);

    const oldImageUrl = item.imageUrl;

    // Remove imageUrl from the item
    item.imageUrl = null;
    item.historyDetails.push({
      action: "Image Deleted",
      date: new Date(),
      by: "System",
      changes: {
        imageUrl: { from: oldImageUrl, to: null },
      },
    });

    await item.save();

    res.status(200).json({ success: true, message: "Image deleted" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "Error deleting image",
      error: error.message,
    });
  }
});

module.exports = router;

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    itemID: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    dateLost: {
      type: Date,
      required: true,
    },
    dateClaimed: {
      type: Date,
    },
    status: { type: String, default: "Unclaimed" },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);

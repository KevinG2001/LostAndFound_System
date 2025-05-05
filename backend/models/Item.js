const mongoose = require("mongoose");

const collectionDetailsSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: "" },
    surname: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { _id: false }
);

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
    garage: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    dateLost: {
      type: Date,
      required: true,
    },
    claimedAt: {
      type: Date,
      default: null,
    },
    dateClaimed: {
      type: Date,
    },
    status: { type: String, default: "Unclaimed" },
    imageUrl: {
      type: String,
    },
    collectionDetails: collectionDetailsSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);

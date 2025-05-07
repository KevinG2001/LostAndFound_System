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

const historyDetailsSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    date: { type: Date, default: Date.now },
    changes: { type: Object, default: {} },
    by: { type: String, default: "System" },
  },
  { _id: false }
);

const itemSchema = new mongoose.Schema(
  {
    itemID: {
      type: String,
      unique: true,
    },
    article: {
      type: String,
      required: true,
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
    dateClaimed: {
      type: Date,
    },
    status: { type: String, default: "Unclaimed" },
    imageUrl: {
      type: String,
    },
    collectionDetails: collectionDetailsSchema,
    historyDetails: [historyDetailsSchema],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);

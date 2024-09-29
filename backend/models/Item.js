const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
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
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    enum: ["lost", "found"],
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

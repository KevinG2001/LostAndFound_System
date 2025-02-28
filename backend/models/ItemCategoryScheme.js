const mongoose = require("mongoose");

const itemCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  prefix: { type: String, required: true, unique: true },
  start: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model("ItemCategory", itemCategorySchema);

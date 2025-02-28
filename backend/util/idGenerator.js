const Item = require("../models/Item");

// itemID is made off of category, Can change to type depending on final decision of what to use
const generatePrefix = (category) => {
  return category
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const getNextId = async (category) => {
  if (!category) {
    throw new Error("Category is required to generate an ID.");
  }

  const prefix = generatePrefix(category);

  const highestItem = await Item.findOne({
    itemID: { $regex: `^${prefix}\\d+$` },
  }).sort({ itemID: -1 });

  let nextId = highestItem
    ? parseInt(highestItem.itemID.replace(prefix, ""), 10) + 1 || 1
    : 1;

  return `${prefix}${nextId.toString().padStart(3, "0")}`;
};

module.exports = { getNextId };

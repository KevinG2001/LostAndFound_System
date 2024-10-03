const Item = require("../models/Item");

const idRanges = {
  Backpack: { start: 1, prefix: "BAG" },
  "Plastic Bag": { start: 1, prefix: "PLB" },
  Keys: { start: 1, prefix: "KEY" },
  Phone: { start: 1, prefix: "PHO" },
};

const getNextId = async (type) => {
  const range = idRanges[type];

  if (!range) {
    throw new Error("Invalid item type");
  }

  const highestItem = await Item.findOne({
    itemID: { $regex: `^${range.prefix}` },
  }).sort({ itemID: -1 });

  let nextId;

  if (highestItem) {
    const currentIdNumber = parseInt(
      highestItem.itemID.replace(range.prefix, ""),
      10
    );
    nextId = currentIdNumber + 1;
  } else {
    nextId = range.start;
  }

  return `${range.prefix}${nextId}`;
};

module.exports = { getNextId };

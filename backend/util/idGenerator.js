const Item = require("../models/Item");

//!Need to add other id ranges like misc, wallets, valubles etc..
const idRanges = {
  Backpack: { start: 1, prefix: "BAG" },
  "Plastic Bag": { start: 1, prefix: "PLB" },
  Keys: { start: 1, prefix: "KEY" },
  Phone: { start: 1, prefix: "PHO" },
};

const getNextId = async (type) => {
  const normalizedType = type.toLowerCase();

  const range = Object.keys(idRanges).find(
    (key) => key.toLowerCase() === normalizedType
  );

  if (!range) {
    throw new Error("Invalid item type");
  }

  const itemRange = idRanges[range];

  const highestItem = await Item.findOne({
    itemID: { $regex: `^${itemRange.prefix}` },
  }).sort({ itemID: -1 });

  let nextId;

  if (highestItem) {
    const currentIdNumber = parseInt(
      highestItem.itemID.replace(itemRange.prefix, ""),
      10
    );
    nextId = currentIdNumber + 1;
  } else {
    nextId = itemRange.start;
  }

  return `${itemRange.prefix}${nextId}`;
};

module.exports = { getNextId };

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    itemID: {
      //ID of item, BAG1, WAL1, PHO1 etc...
      type: String,
      unique: true,
    },
    description: {
      //Description of item, Blackpack with logo on front
      type: String,
      required: true,
    },
    category: {
      //What category is it in Bag, Wallet, Phone, etc...
      type: String,
      required: true,
    },
    type: {
      //What type of item is it? Backpack, Plastic Bag, iPhone, etc...
      type: String,
      required: true,
    },
    route: {
      //What route was it found on
      type: String,
      required: true,
    },
    notes: {
      //Anyother notes you want to add, Content of bag etc...
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);

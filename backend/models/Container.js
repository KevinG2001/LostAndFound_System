const mongoose = require("mongoose");

const ContainerSchema = new mongoose.Schema(
  {
    containerID: String,
    dateCreated: Date,
    listOfItemID: [String],
    amountOfItems: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Container", ContainerSchema);

const mongoose = require("mongoose");

const containerSchema = new mongoose.Schema(
  {
    containerID: {
      type: String,
      unique: true,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    listOfItemRef: [
      {
        type: String, // e.g., "bag001", "key001"
        required: true,
      },
    ],
    amountOfItems: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Middleware to auto-update amountOfItems based on listOfItemRef
containerSchema.pre("save", function (next) {
  this.amountOfItems = this.listOfItemRef.length;
  next();
});

module.exports = mongoose.model("Container", containerSchema);

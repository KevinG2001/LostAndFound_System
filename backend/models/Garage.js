const mongoose = require("mongoose");

const GarageSchema = new mongoose.Schema({
  garageName: { type: String, required: true },
  company: { type: String, required: true },
  routes: [String],
});

const Garage = mongoose.models.Garage || mongoose.model("Garage", GarageSchema);

module.exports = Garage;

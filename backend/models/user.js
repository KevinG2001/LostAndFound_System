const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  Firstname: String,
  Surname: String,
  Company: String,
  Location: String,
  Password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);

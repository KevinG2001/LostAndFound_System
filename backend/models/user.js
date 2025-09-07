const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true, trim: true },
  Firstname: { type: String, trim: true },
  Surname: { type: String, trim: true },
  Company: { type: String, trim: true },
  Location: { type: String, trim: true },
  Password: { type: String, required: true },
  role: {
    type: String,
    ref: "Role",
    required: true,
    default: "Employee",
  },
  userId: { type: Number, unique: true },
});

module.exports = mongoose.model("User", userSchema);

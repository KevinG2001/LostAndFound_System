const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const uri = process.env.MONGO_URI;

module.exports = connectDB;

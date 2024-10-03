const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the CORS middleware
const itemRoutes = require("./routes/items");
require("dotenv").config();

const app = express();

// Use the CORS middleware
app.use(cors()); // This will enable CORS for all routes

app.use(express.json());

// Use item routes
app.use("/items", itemRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server started on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

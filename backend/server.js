const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the CORS middleware
const itemRoutes = require("./routes/items");
const ticketRoutes = require("./routes/tickets");
const statsRoute = require("./routes/stats");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

// Use routes
app.use("/items", itemRoutes);
app.use("/tickets", ticketRoutes);
app.use("/stats", statsRoute);

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

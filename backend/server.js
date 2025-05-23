const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./middleware/corsOptions");
const io = require("./socket/chat");
require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.local",
});
const path = require("path");

const app = express();
const server = http.createServer(app);

// Apply CORS middleware to Express
app.use(cors(corsOptions));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use("/webPortal", express.static(path.join(__dirname, "dist")));

  app.get("/webPortal/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  app.get("/webPortal", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

// API Routes
const itemRoutes = require("./routes/items");
const ticketRoutes = require("./routes/tickets");
const countsRoutes = require("./routes/counts");
const searchRoutes = require("./routes/search");
const statRoutes = require("./routes/stats");
const garageRoutes = require("./routes/garages");

app.use("/items", itemRoutes);
app.use("/tickets", ticketRoutes);
app.use("/counts", countsRoutes);
app.use("/search", searchRoutes);
app.use("/stats", statRoutes);
app.use("/garages", garageRoutes);

// Use error handler middleware
app.use(errorHandler);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 4000;
    server.listen(PORT, "0.0.0.0", () => {
      io.attach(server, { cors: corsOptions });
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

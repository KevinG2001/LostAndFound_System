const express = require("express");
const Ticket = require("../models/Tickets");
const router = express.Router();
const { formatItemDates } = require("../utils/dateFormatter");

router.get("/list", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    const formattedTickets = tickets.map(formatItemDates);
    res.status(200).json(formattedTickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({
      message: "Error fetching tickets",
      error: error.message,
    });
  }
});

module.exports = router;

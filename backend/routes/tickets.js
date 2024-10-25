const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const Ticket = require("../models/Tickets");

router.get("/list", async (req, res) => {
  try {
    const tickets = await Ticket.find();

    const formattedTickets = tickets.map((ticket) => {
      const plainTicket = ticket.toObject();

      return {
        ...plainTicket,
        date_lost: dayjs(plainTicket.date_lost).format("DD-MM-YYYY"),
        created_at: dayjs(plainTicket.createdAt).format("DD-MM-YYYY"),
        updatedAt: dayjs(plainTicket.updatedAt).format("DD-MM-YYYY"),
      };
    });

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

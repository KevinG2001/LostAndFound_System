const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Ticket = require("../models/Tickets");

router.get("/:resource/count", async (req, res) => {
  const { resource } = req.params;

  try {
    if (resource === "items") {
      const itemCount = await Item.countDocuments({});
      const returnedCount = await Item.countDocuments({ status: "Returned" });
      const lostItemCount = await Item.countDocuments({ status: "Lost" });

      return res.json({
        itemCounts: { itemCount, returnedCount, lostItemCount },
      });
    } else if (resource === "tickets") {
      const ticketCount = await Ticket.countDocuments({});
      const openTicketCount = await Ticket.countDocuments({ status: "open" });
      const closedTicketCount = await Ticket.countDocuments({
        status: "closed",
      });

      return res.json({
        ticketCounts: { ticketCount, openTicketCount, closedTicketCount },
      });
    } else {
      return res.status(400).json({ error: "Invalid resource" });
    }
  } catch (error) {
    console.error("Error fetching counts", error);
    res.status(500).json({
      message: "Error fetching counts",
      error: error.message,
    });
  }
});

module.exports = router;

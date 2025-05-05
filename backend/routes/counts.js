const express = require("express");
const router = express.Router();

const Item = require("../models/Item");
const Ticket = require("../models/Tickets");

router.get("/:resource/count", async (req, res) => {
  const { resource } = req.params;

  try {
    if (resource === "items") {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      const totalLostThisMonth = await Item.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });

      const toCollectThisMonth = await Item.countDocuments({
        status: "To Collect",
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });

      const totalReturnedThisMonth = await Item.countDocuments({
        status: "Claimed",
        dateClaimed: { $gte: startOfMonth, $lte: endOfMonth },
      });

      return res.json({
        totalLostThisMonth,
        toCollectThisMonth,
        totalReturnedThisMonth,
      });
    } else if (resource === "tickets") {
      const totalCount = await Ticket.countDocuments();
      const openTicketCount = await Ticket.countDocuments({ status: "Open" });
      const closedTicketCount = await Ticket.countDocuments({
        status: "Closed",
      });

      return res.json({
        totalCount,
        openTicketCount,
        closedTicketCount,
      });
    } else {
      return res.status(400).json({ message: "Invalid resource type" });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error fetching ${resource} stats`,
      error: error.message,
    });
  }
});

module.exports = router;

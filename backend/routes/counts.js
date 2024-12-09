const express = require("express");
const router = express.Router();

const countDocuments = async (Model, statusField = null) => {
  const totalCount = await Model.countDocuments({});

  if (statusField) {
    const statusCounts = await Promise.all(
      Object.keys(statusField.statuses).map(async (status) => ({
        [statusField.statuses[status]]: await Model.countDocuments({
          [statusField.field]: status,
        }),
      }))
    );

    return {
      totalCount,
      ...statusCounts.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    };
  }

  return { totalCount };
};

router.get("/:resource/count", async (req, res) => {
  const { resource } = req.params;

  try {
    const models = {
      items: {
        model: require("../models/Item"),
        statusField: {
          field: "status",
          statuses: {
            Claimed: "returnedCount",
            Unclaimed: "lostItemCount",
          },
        },
      },
      tickets: {
        model: require("../models/Tickets"),
        statusField: {
          field: "status",
          statuses: {
            Open: "openTicketCount",
            Closed: "closedTicketCount",
          },
        },
      },
    };

    if (!models[resource]) {
      return res.status(400).json({ error: "Invalid resource" });
    }

    const { model, statusField } = models[resource];
    const counts = await countDocuments(model, statusField);

    res.json({ [`${resource}Counts`]: counts });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching counts",
      error: error.message,
    });
  }
});

module.exports = router;

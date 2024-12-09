const express = require("express");
const router = express.Router();
const { formatItemDates } = require("../utils/dateFormatter");

const genericSearch = async (Model, param, query) => {
  const searchCriteria = {
    [param.toLowerCase()]: { $regex: query, $options: "i" },
  };

  const items = await Model.find(searchCriteria);
  return items.map(formatItemDates);
};

router.post("/search/:model", async (req, res) => {
  const { model } = req.params;
  const { param, query } = req.body;

  const models = {
    items: require("../models/Item"),
    tickets: require("../models/Tickets"),
  };

  try {
    if (!models[model]) {
      return res.status(400).json({ error: "Invalid model" });
    }

    const results = await genericSearch(models[model], param, query);

    res.status(200).json({
      success: true,
      items: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error searching for ${model}`,
      error: error.message,
    });
  }
});

module.exports = router;

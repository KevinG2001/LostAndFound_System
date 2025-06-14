const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");

const countItemsByMonth = async (Model) => {
  const result = await Model.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$dateLost" },
          month: { $month: "$dateLost" },
          status: "$status",
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1, "_id.status": 1 },
    },
  ]);

  return result.reduce((acc, item) => {
    const monthName = dayjs()
      .month(item._id.month - 1)
      .format("MMMM");

    if (!acc[monthName]) {
      acc[monthName] = {
        total: 0,
        claimed: 0,
        unclaimed: 0,
        expired: 0,
        toCollect: 0,
      };
    }

    acc[monthName].total += item.count;
    if (item._id.status === "Claimed") {
      acc[monthName].claimed += item.count;
    } else if (item._id.status === "Unclaimed") {
      acc[monthName].unclaimed += item.count;
    } else if (item._id.status === "Expired") {
      acc[monthName].expired += item.count;
    } else if (item._id.status === "To Collect") {
      acc[monthName].toCollect += item.count;
    }

    return acc;
  }, {});
};

router.get("/lost-per-month", async (req, res) => {
  try {
    const model = require("../models/Item");
    const counts = await countItemsByMonth(model);

    const formattedData = Object.entries(counts).map(([month, data]) => ({
      month,
      total: data.total,
      claimed: data.claimed,
      unclaimed: data.unclaimed,
      expired: data.expired,
      toCollect: data.toCollect,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({
      message: "Error fetching lost items per month",
      error: error.message,
    });
  }
});

router.get("/typeLost", async (req, res) => {
  try {
    const model = require("../models/Item");

    const result = await model.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedData = result.map((item) => ({
      category: item._id,
      count: item.count,
    }));

    res.json(formattedData);
  } catch {
    console.error("Error fetching counts:", error);
  }
});

router.get("/items-by-type", async (req, res) => {
  try {
    const model = require("../models/Item");

    const result = await model.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const formattedData = result.map((item) => ({
      category: item._id,
      count: item.count,
    }));
    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching items by type:", error);
    res.status(500).json({
      message: "Error fetching items by type",
      error: error.message,
    });
  }
});

router.get("/items-today", async (req, res) => {
  try {
    const model = require("../models/Item");

    const startOfDay = dayjs().startOf("day").toDate();
    const endOfDay = dayjs().endOf("day").toDate();

    const count = await model.countDocuments({
      dateLost: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    res.json({ count });
  } catch (error) {
    console.error("Error fetching today's item count:", error);
    res.status(500).json({
      message: "Error fetching today's item count",
      error: error.message,
    });
  }
});

router.get("/items-to-collect-this-month", async (req, res) => {
  try {
    const model = require("../models/Item");

    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    const count = await model.countDocuments({
      status: "To Collect",
      dateLost: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    res.json({ count });
  } catch (error) {
    console.error("Error fetching 'To Collect' count for this month:", error);
    res.status(500).json({
      message: "Error fetching count",
      error: error.message,
    });
  }
});

router.get("/items-by-status", async (req, res) => {
  try {
    const model = require("../models/Item");

    const result = await model.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedData = result.map((item) => ({
      category: item._id,
      count: item.count,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching item status distribution:", error);
    res.status(500).json({
      message: "Error fetching item status distribution",
      error: error.message,
    });
  }
});

module.exports = router;

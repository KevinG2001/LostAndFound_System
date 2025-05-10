const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const routes = require("../routes/stats");
const Item = require("../models/Item");

const app = express();
app.use(express.json());
app.use("/", routes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  await mongoose.connection.db.dropDatabase();

  await Item.create([
    {
      itemID: "PHO1",
      article: "iPhone",
      description: "Lost phone",
      category: "Electronics",
      type: "Phone",
      route: "A-B",
      dateLost: new Date("2024-12-01"),
      status: "Claimed",
    },
    {
      itemID: "CLO2",
      article: "T-Shirt",
      description: "Lost shirt",
      category: "Clothing",
      type: "Shirt",
      route: "C-D",
      dateLost: new Date("2024-12-02"),
      status: "Unclaimed",
    },
    {
      itemID: "MISC3",
      article: "Book",
      description: "Lost book",
      category: "Books",
      type: "Book",
      route: "E-F",
      dateLost: new Date("2024-12-03"),
      status: "Expired",
    },
    {
      itemID: "KEY4",
      article: "Keys",
      description: "Lost keys",
      category: "Accessories",
      type: "Keys",
      route: "G-H",
      dateLost: new Date("2024-11-30"),
      status: "To Collect",
    },
    {
      itemID: "WALL5",
      article: "Wallet",
      description: "Lost wallet",
      category: "Accessories",
      type: "Wallet",
      route: "I-J",
      dateLost: new Date("2024-11-25"),
      status: "Claimed",
    },
  ]);
});

describe("Stats API", () => {
  test("GET /lost-per-month should return counts grouped by month and status", async () => {
    const res = await request(app).get("/lost-per-month");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          month: "November",
          total: 2,
          claimed: 1,
          toCollect: 1,
        }),
        expect.objectContaining({
          month: "December",
          total: 3,
          claimed: 1,
          unclaimed: 1,
          expired: 1,
        }),
      ])
    );
  });

  test("GET /typeLost should return counts by category", async () => {
    const res = await request(app).get("/typeLost");
    expect(res.statusCode).toBe(200);

    const expected = [
      { category: "Accessories", count: 2 },
      { category: "Books", count: 1 },
      { category: "Clothing", count: 1 },
      { category: "Electronics", count: 1 },
    ];

    expect(res.body).toEqual(expect.arrayContaining(expected));
  });

  test("GET /items-today should return 0 if no items lost today", async () => {
    const res = await request(app).get("/items-today");
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(0);
  });

  test("GET /items-to-collect-this-month should return items with 'To Collect' status this month", async () => {
    const res = await request(app).get("/items-to-collect-this-month");

    const now = new Date();
    const expectedCount = now.getMonth() === 10 ? 1 : 0;

    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(expectedCount);
  });

  test("GET /lost-per-month returns empty array when no data", async () => {
    await mongoose.connection.db.dropDatabase();
    const res = await request(app).get("/lost-per-month");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});

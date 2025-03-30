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
  await mongoose.connection.close();
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
});

describe("Lost Items API", () => {
  beforeEach(async () => {
    await Item.create([
      {
        itemID: "PHO1",
        description: "Lost phone",
        category: "Electronics",
        type: "Phone",
        route: "A-B",
        dateLost: new Date("2024-12-01"),
        status: "Claimed",
      },
      {
        itemID: "CLO2",
        description: "Lost shirt",
        category: "Clothing",
        type: "Shirt",
        route: "C-D",
        dateLost: new Date("2024-12-02"),
        status: "Unclaimed",
      },
      {
        itemID: "MISC3",
        description: "Lost book",
        category: "Books",
        type: "Book",
        route: "E-F",
        dateLost: new Date("2024-12-03"),
        status: "Expired",
      },
      {
        itemID: "KEY4",
        description: "Lost keys",
        category: "Accessories",
        type: "Keys",
        route: "G-H",
        dateLost: new Date("2024-11-30"),
        status: "To Collect",
      },
      {
        itemID: "WALL5",
        description: "Lost wallet",
        category: "Accessories",
        type: "Wallet",
        route: "I-J",
        dateLost: new Date("2024-11-25"),
        status: "Claimed",
      },
    ]);
  });

  // Testing correct response when fetching lost items per month
  test("GET /lost-per-month should return counts by month with correct data", async () => {
    const response = await request(app).get("/lost-per-month");
    expect(response.statusCode).toBe(200);

    const expected = [
      {
        month: "November",
        total: 2,
        claimed: 1,
        unclaimed: 0,
        expired: 0,
        toCollect: 1,
      },
      {
        month: "December",
        total: 3,
        claimed: 1,
        unclaimed: 1,
        expired: 1,
        toCollect: 0,
      },
    ];

    expect(response.body).toEqual(expect.arrayContaining(expected));
  });

  // Testing correct response when fetching lost items by category
  test("GET /typeLost should return counts by category with correct data", async () => {
    const response = await request(app).get("/typeLost");
    expect(response.statusCode).toBe(200);

    const expected = [
      { category: "Accessories", count: 2 },
      { category: "Books", count: 1 },
      { category: "Clothing", count: 1 },
      { category: "Electronics", count: 1 },
    ];

    expect(response.body).toEqual(expect.arrayContaining(expected));
  });

  // Testing sorting of items by category count
  test("GET /items-by-type should return items sorted by count", async () => {
    const response = await request(app).get("/items-by-type");
    expect(response.statusCode).toBe(200);

    const expected = [
      { category: "Accessories", count: 2 },
      { category: "Books", count: 1 },
      { category: "Clothing", count: 1 },
      { category: "Electronics", count: 1 },
    ];

    const sortedExpected = expected.sort((a, b) =>
      a.category.localeCompare(b.category)
    );
    const sortedReceived = response.body.sort((a, b) =>
      a.category.localeCompare(b.category)
    );

    expect(sortedReceived).toEqual(sortedExpected);
  });

  // Testing correct error handling when database connection fails
  test("GET /lost-per-month should return error when database fails", async () => {
    await mongoose.connection.close();
    const response = await request(app).get("/lost-per-month");
    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Error fetching lost items per month");
  });

  // Testing response when the database is empty
  test("GET /lost-per-month should return empty array when database is empty", async () => {
    await mongoose.connection.db.dropDatabase();

    const response = await request(app).get("/lost-per-month");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

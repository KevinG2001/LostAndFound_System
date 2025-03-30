const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const router = require("../routes/items");
const Item = require("../models/Item");

const app = express();
app.use(express.json());
app.use("/", router);

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

describe("Items API", () => {
  // 1. Test for creating an item
  test("POST /create should create a new item", async () => {
    const newItem = {
      description: "Lost wallet",
      category: "Personal Items",
      type: "Wallet",
      route: "Route 5",
      garage: "Garage A",
      notes: "Black leather",
      dateLost: "2025-03-20T10:00:00Z",
    };

    const response = await request(app).post("/create").send(newItem);
    expect(response.statusCode).toBe(201);
    expect(response.body.description).toBe(newItem.description);
    expect(response.body.category).toBe(newItem.category);
    expect(response.body.status).toBe("Unclaimed");
    expect(response.body.itemID).toBeDefined();
  });

  // 2. Test for getting the list of items
  test("GET /list should return all items", async () => {
    const item1 = new Item({
      description: "Lost wallet",
      category: "Personal Items",
      type: "Wallet",
      route: "Route 5",
      garage: "Garage A",
      notes: "Black leather",
      dateLost: "2025-03-20T10:00:00Z",
      status: "Unclaimed",
      itemID: "ITEM123",
    });
    const item2 = new Item({
      description: "Lost phone",
      category: "Electronics",
      type: "Phone",
      route: "Route 3",
      garage: "Garage B",
      notes: "iPhone 12",
      dateLost: "2025-03-21T14:00:00Z",
      status: "Unclaimed",
      itemID: "ITEM124",
    });
    await item1.save();
    await item2.save();

    const response = await request(app).get("/list");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].description).toBe("Lost wallet");
    expect(response.body[1].description).toBe("Lost phone");
  });

  // 3. Test for updating an item
  test("PUT /update/:itemID should update an item", async () => {
    const item = new Item({
      description: "Lost wallet",
      category: "Personal Items",
      type: "Wallet",
      route: "Route 5",
      garage: "Garage A",
      notes: "Black leather",
      dateLost: "2025-03-20T10:00:00Z",
      status: "Unclaimed",
      itemID: "ITEM123",
    });
    await item.save();

    const updatedItem = {
      description: "Lost black wallet",
      category: "Personal Items",
      type: "Wallet",
      route: "Route 5",
      garage: "Garage A",
      notes: "Black leather, with cards",
      dateLost: "2025-03-20T10:00:00Z",
      status: "Claimed",
    };

    const response = await request(app)
      .put(`/update/${item.itemID}`)
      .send(updatedItem);

    expect(response.statusCode).toBe(200);
    expect(response.body.description).toBe(updatedItem.description);
    expect(response.body.status).toBe("Claimed");
  });

  // 4. Test for updating an item that does not exist
  test("PUT /update/:itemID should return 404 if item not found", async () => {
    const updatedItem = {
      description: "Lost black wallet",
      category: "Personal Items",
      type: "Wallet",
      route: "Route 5",
      garage: "Garage A",
      notes: "Black leather, with cards",
      dateLost: "2025-03-20T10:00:00Z",
      status: "Claimed",
    };

    const response = await request(app)
      .put("/update/ITEM_NONEXISTENT")
      .send(updatedItem);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Item not found");
  });

  // 5. Test for invalid create item request (missing required fields)
  test("POST /create should return 400 if required fields are missing", async () => {
    const invalidItem = {
      category: "Personal Items",
      type: "Wallet",
      route: "Route 5",
      garage: "Garage A",
      notes: "Black leather",
    };

    const response = await request(app).post("/create").send(invalidItem);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "Validation failed: description, dateLost"
    );
  });

  // 6. Test for creating an item with missing dateLost
  test("POST /create should return 400 if dateLost is missing", async () => {
    const invalidItem = {
      description: "Lost wallet",
      category: "Personal Items",
      type: "Wallet",
      route: "Route 5",
      garage: "Garage A",
      notes: "Black leather",
    };

    const response = await request(app).post("/create").send(invalidItem);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
  });
});

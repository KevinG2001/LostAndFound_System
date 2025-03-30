// tests/tickets.test.js
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const router = require("../routes/tickets");
const Ticket = require("../models/Tickets");

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

describe("Tickets API", () => {
  // Testing correct response when fetching all tickets
  test("GET /list should return all tickets with correct data", async () => {
    const ticket = new Ticket({
      ticketId: "TICKET1",
      description: "Lost phone",
      contactInfo: { email: "contact@domain.com" },
      status: "Open",
      dateCreated: new Date(),
      dateLost: new Date("2024-12-01"),
    });
    await ticket.save();

    const response = await request(app).get("/list");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].ticketId).toBe(ticket.ticketId);
    expect(response.body[0].description).toBe(ticket.description);
  });

  // Testing correct response when submitting a ticket
  test("POST /submitTicket should create a new ticket", async () => {
    const newTicket = {
      description: "Lost wallet",
      contactInfo: {
        name: "John Doe",
        email: "contact@domain.com", // Ensure email is provided
        phone: "123-456-7890", // Optional
      },
      firstName: "John",
      surname: "Doe",
      dateLost: "2024-12-02",
    };

    const response = await request(app).post("/submitTicket").send(newTicket);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("ticketId");
    expect(response.body.ticketId).toHaveLength(6); // Random ticket ID should be 6 characters
  });

  // Testing correct response when fetching a specific ticket by ticketId
  test("GET /:ticketId should return the correct ticket", async () => {
    const ticket = new Ticket({
      ticketId: "TICKET1",
      description: "Lost phone charger",
      contactInfo: { email: "contact@domain.com" },
      status: "Open",
      dateCreated: new Date(),
      dateLost: new Date("2024-12-03"),
    });
    await ticket.save();

    const response = await request(app).get(`/TICKET1`);
    expect(response.statusCode).toBe(200);
    expect(response.body.ticketId).toBe(ticket.ticketId);
    expect(response.body.description).toBe(ticket.description);
  });

  // Testing correct error handling when ticket is not found
  test("GET /:ticketId should return 404 if ticket is not found", async () => {
    const response = await request(app).get("/NONEXISTENTID");
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Ticket not found");
  });

  // Testing correct response when adding a message to a ticket
  test("POST /:ticketId/addMessage should add a message to the ticket", async () => {
    const ticket = new Ticket({
      ticketId: "TICKET3",
      description: "Lost umbrella",
      contactInfo: { email: "contact@domain.com" },
      status: "Open",
      dateCreated: new Date(),
      dateLost: new Date("2024-12-04"),
    });
    await ticket.save();

    const newMessage = {
      sender: "support",
      message: "We are looking into your issue.",
    };

    const response = await request(app)
      .post(`/TICKET3/addMessage`)
      .send(newMessage);
    expect(response.statusCode).toBe(200);
    expect(response.body.sender).toBe("Support");
    expect(response.body.message).toBe(newMessage.message);
    expect(response.body.timestamp).toBeDefined();
  });

  // Testing correct error handling when adding a message without required fields
  test("POST /:ticketId/addMessage should return 400 if sender or message is missing", async () => {
    const ticket = new Ticket({
      ticketId: "TICKET4",
      description: "Lost keys",
      contactInfo: { email: "contact@domain.com" },
      status: "Open",
      dateCreated: new Date(),
      dateLost: new Date("2024-12-05"),
    });
    await ticket.save();

    const response = await request(app)
      .post(`/TICKET4/addMessage`)
      .send({ sender: "", message: "" });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Sender and message are required");
  });

  // Testing correct error handling when ticket is not found for adding a message
  test("POST /:ticketId/addMessage should return 404 if ticket is not found", async () => {
    const response = await request(app)
      .post("/NONEXISTENTID/addMessage")
      .send({ sender: "support", message: "Message content" });
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Ticket not found");
  });
});

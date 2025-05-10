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
  test("GET /list should return all tickets", async () => {
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
    expect(response.body[0].ticketId).toBe("TICKET1");
    expect(response.body[0].description).toBe("Lost phone");
  });

  test("POST /submitTicket should create a new ticket", async () => {
    const newTicket = {
      description: "Lost wallet",
      contactInfo: {
        name: "John Doe",
        email: "contact@domain.com",
        phone: "123-456-7890",
      },
      firstName: "John",
      surname: "Doe",
      dateLost: "2024-12-02",
    };

    const response = await request(app).post("/submitTicket").send(newTicket);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("ticketId");
    expect(response.body.ticketId).toHaveLength(6);
  });

  test("POST /submitTicket should return 400 if required fields are missing", async () => {
    const incompleteTicket = {
      contactInfo: { email: "missing@info.com" },
      dateLost: "2024-12-02",
    };

    const response = await request(app)
      .post("/submitTicket")
      .send(incompleteTicket);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(
      "Description, Contact Info, and Date Lost are required."
    );
  });

  test("GET /:ticketId should return the correct ticket", async () => {
    const ticket = new Ticket({
      ticketId: "TICKET2",
      description: "Lost headphones",
      contactInfo: { email: "user@domain.com" },
      status: "Open",
      dateCreated: new Date(),
      dateLost: new Date("2024-12-03"),
    });
    await ticket.save();

    const response = await request(app).get("/TICKET2");
    expect(response.statusCode).toBe(200);
    expect(response.body.ticketId).toBe("TICKET2");
    expect(response.body.description).toBe("Lost headphones");
  });

  test("GET /:ticketId should return 404 if ticket not found", async () => {
    const response = await request(app).get("/NONEXISTENT");
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Ticket not found");
  });

  test("POST /:ticketId/addMessage should add a support message", async () => {
    const ticket = new Ticket({
      ticketId: "TICKET3",
      description: "Lost umbrella",
      contactInfo: { email: "contact@domain.com" },
      status: "Open",
      dateCreated: new Date(),
      dateLost: new Date("2024-12-04"),
    });
    await ticket.save();

    const message = {
      sender: "support",
      message: "We're looking into it.",
    };

    const response = await request(app)
      .post("/TICKET3/addMessage")
      .send(message);
    expect(response.statusCode).toBe(200);
    expect(response.body.sender).toBe("Support");
    expect(response.body.message).toBe(message.message);
    expect(response.body.timestamp).toBeDefined();
  });

  test("POST /:ticketId/addMessage should return 400 if sender or message missing", async () => {
    const ticket = new Ticket({
      ticketId: "TICKET4",
      description: "Lost ID card",
      contactInfo: { email: "contact@domain.com" },
      status: "Open",
      dateCreated: new Date(),
      dateLost: new Date("2024-12-05"),
    });
    await ticket.save();

    const response = await request(app).post("/TICKET4/addMessage").send({
      sender: "",
      message: "",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Sender and message are required");
  });

  test("POST /:ticketId/addMessage should return 404 if ticket not found", async () => {
    const response = await request(app)
      .post("/NONEXISTENT/addMessage")
      .send({ sender: "support", message: "Checking in on your report." });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Ticket not found");
  });
});

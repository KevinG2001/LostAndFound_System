const express = require("express");
const Ticket = require("../models/Tickets");
const router = express.Router();
const { formatItemDates } = require("../util/dateFormatter");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

router.get("/list", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    const formattedTickets = tickets.map(formatItemDates);
    res.status(200).json(formattedTickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({
      message: "Error fetching tickets",
      error: error.message,
    });
  }
});

router.post("/submitTicket", async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { description, contactInfo, firstName, surname, dateLost } = req.body;

    if (!description || !contactInfo || !dateLost) {
      return res.status(400).json({
        error: "Description, Contact Info, and Date Lost are required.",
      });
    }

    const newTicket = new Ticket({
      ticketId: Math.random().toString(36).substring(2, 8).toUpperCase(),
      description,
      contactInfo,
      status: "Open",
      dateCreated: new Date(),
      dateLost: new Date(dateLost),
      firstName,
      surname,
    });

    await newTicket.save();

    const mailOptions = {
      from: process.env.USER,
      to: contactInfo.email,
      subject: `Your Ticket ${newTicket.ticketId} has been created`,
      text: `Hello ${contactInfo.name},

Thank you for submitting your lost item report. Your ticket ID is ${newTicket.ticketId}.

You can reopen the chat with that ID!

Best regards,
Lost & Found Team
`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ ticketId: newTicket.ticketId });
  } catch (error) {
    console.error("Error submitting ticket or sending email:", error);
    res.status(500).json({ error: "Failed to create ticket and send email" });
  }
});

router.put("/update/:ticketId", async (req, res) => {
  console.log("Update ticket route hit with ID:", req.params.ticketId);
  console.log("Update body:", req.body);
  try {
    const updatedTicket = await Ticket.findOneAndUpdate(
      { ticketId: req.params.ticketId },
      req.body,
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(updatedTicket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:ticketId", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    res.status(200).json(ticket);
  } catch (err) {
    console.error("Error fetching ticket:", err);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
});

router.post("/:ticketId/addMessage", async (req, res) => {
  const { sender, message } = req.body;

  if (!sender || !message) {
    return res.status(400).json({ error: "Sender and message are required" });
  }

  try {
    console.log("Finding ticket with ticketId:", req.params.ticketId);

    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
    if (!ticket) {
      console.log("Ticket not found:", req.params.ticketId);
      return res.status(404).json({ error: "Ticket not found" });
    }

    let senderName = sender;

    if (sender === "support") {
      senderName = "Support";
    } else if (sender === "customer") {
      senderName = ticket.customer.firstName;
    }

    const newMessage = { sender: senderName, message, timestamp: new Date() };

    ticket.messages.push(newMessage);

    await ticket.save();

    console.log("Message added successfully:", newMessage);

    res.status(200).json(newMessage);
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Failed to add message" });
  }
});

module.exports = router;

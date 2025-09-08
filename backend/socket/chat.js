// src/socket/io.js
const { Server } = require("socket.io");
const Ticket = require("../models/Tickets");

const io = new Server();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on(
    "sendMessage",
    async ({ ticketId, sender, company, message, timestamp }) => {
      try {
        if (!message || !ticketId) return;

        const actualSender = sender?.trim() || "Support Agent";
        const newMessage = {
          sender: actualSender,
          company: company || "Customer",
          message,
          timestamp: timestamp || new Date().toISOString(),
        };

        const ticket = await Ticket.findOne({ ticketId });
        if (!ticket) {
          console.error("Ticket not found:", ticketId);
          return;
        }

        ticket.messages.push(newMessage);
        await ticket.save();

        io.emit("newMessage", { ticketId, ...newMessage });
        console.log("Message saved to the database:", newMessage);
      } catch (err) {
        console.error("Error handling sendMessage:", err);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

module.exports = io;

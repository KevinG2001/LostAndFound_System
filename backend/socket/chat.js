const { Server } = require("socket.io");
const Ticket = require("../models/Tickets");
const io = new Server();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("sendMessage", async ({ ticketId, sender, message, timestamp }) => {
    try {
      console.log("Message received:", {
        ticketId,
        sender,
        message,
        timestamp,
      });

      const ticket = await Ticket.findOne({ ticketId });
      if (!ticket) {
        console.error("Ticket not found:", ticketId);
        return;
      }

      const newMessage = { sender, message, timestamp };
      ticket.messages.push(newMessage);

      await ticket.save();
      console.log("Message saved to the database");

      io.emit("newMessage", { ticketId, ...newMessage });
    } catch (err) {
      console.error("Error handling sendMessage:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

module.exports = io;

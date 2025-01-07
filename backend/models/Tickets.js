const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  dateCreated: { type: Date, default: Date.now },
  dateLost: { type: Date, required: false },
  contactInfo: {
    name: { type: String, required: false },
    email: { type: String, required: true },
    phone: { type: String, required: false },
  },
  description: { type: String, required: true },
  status: { type: String, default: "Open", enum: ["Open", "Closed"] },
  messages: [
    {
      sender: { type: String, required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Ticket", ticketSchema);

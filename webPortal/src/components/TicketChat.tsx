import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const TicketChat = ({ ticketId }: { ticketId: string }) => {
  const [messages, setMessages] = useState<
    { sender: string; message: string; timestamp: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null); // New state for customer name
  const socketRef = useRef<Socket | null>(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tickets/${ticketId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const ticket = await response.json();
      setMessages(ticket.messages || []);
      setCustomerName(ticket.contactInfo?.name || "User"); // Set the customer's name
    } catch (error: any) {
      console.error("Error fetching messages:", error.message);
      setError("Failed to load messages");
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      sender: customerName || "User", // Use customerName in the sender field
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        ticketId,
        ...messageData,
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    // Fetch initial messages and customer name
    fetchMessages();

    // Connect to WebSocket server
    const socket = io(import.meta.env.VITE_API_URL);
    socketRef.current = socket;

    // Listen for new messages
    socket.on("newMessage", (data) => {
      if (data.ticketId === ticketId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [ticketId]);

  return (
    <div>
      <h3>Chat</h3>
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{msg.sender}</strong>: {msg.message} <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <textarea
        rows={3}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here..."
        style={{ width: "100%", margin: "10px 0" }}
      />
      <button onClick={handleSendMessage}>Send</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TicketChat;

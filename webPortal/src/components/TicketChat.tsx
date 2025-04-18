import { useState, useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import Styles from "../styles/ticketchat.module.scss";
import useTicketMessages from "../util/useTicketMessage";

interface Message {
  sender: string;
  message: string;
  timestamp: string;
}

const TicketChat = ({ ticketId }: { ticketId: string }) => {
  const { messages, customerName, error, fetchMessages } =
    useTicketMessages(ticketId);

  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !socketRef.current) return;

    const messageData: Message = {
      sender: customerName || "User",
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    socketRef.current.emit("sendMessage", { ticketId, ...messageData });
    setNewMessage("");
    setLocalMessages((prev) => [...prev, messageData]);
  }, [newMessage, customerName, ticketId]);

  useEffect(() => {
    fetchMessages();

    const socket = io(import.meta.env.VITE_API_URL);
    socketRef.current = socket;

    const handleIncoming = (data: any) => {
      if (data.ticketId === ticketId) {
        setLocalMessages((prev) => [...prev, data]);
      }
    };

    socket.on("newMessage", handleIncoming);

    return () => {
      socket.off("newMessage", handleIncoming);
      socket.disconnect();
    };
  }, [fetchMessages, ticketId]);

  const allMessages = [...messages, ...localMessages];

  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleString();

  return (
    <div className={Styles.chatContainer}>
      <h3 className={Styles.chatTitle}>Chat</h3>

      <div className={Styles.chatBox}>
        {allMessages.map(({ sender, message, timestamp }, idx) => (
          <div
            key={idx}
            className={`${Styles.chatMessage} ${
              sender === customerName ? Styles.userMessage : Styles.staffMessage
            }`}
          >
            <strong>{sender}</strong>
            <p>{message}</p>
            <small>{formatTime(timestamp)}</small>
          </div>
        ))}
      </div>

      <textarea
        rows={3}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here..."
        className={Styles.textInput}
      />

      <button onClick={handleSendMessage} className={Styles.sendButton}>
        Send
      </button>

      {error && <p className={Styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default TicketChat;

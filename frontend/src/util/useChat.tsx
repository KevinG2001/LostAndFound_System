import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
  sender: string;
  message: string;
  timestamp: string;
}

export const useChat = (ticketId: string, senderName: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
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
    } catch (error: any) {
      console.error("Error fetching messages:", error.message);
      setError("Failed to load messages");
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      sender: senderName,
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
    fetchMessages();

    const socket = io(import.meta.env.VITE_API_URL);
    socketRef.current = socket;

    socket.on("newMessage", (data) => {
      if (data.ticketId === ticketId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [ticketId]);

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    error,
  };
};

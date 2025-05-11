import { useState, useCallback } from "react";
import { Message } from "../types/message";
import { Ticket } from "../types/ticket";

const useTicketMessages = (ticketId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tickets/${ticketId}`
      );
      if (!response.ok) throw new Error("Failed to fetch messages");

      const ticket: Ticket = await response.json();
      setMessages(ticket.messages || []);
      setCustomerName(ticket.contactInfo?.name || "User");
      setDescription(ticket.description || null);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching messages:", err.message);
      setError("Failed to load messages");
    }
  }, [ticketId]);

  return { messages, customerName, description, error, fetchMessages };
};

export default useTicketMessages;

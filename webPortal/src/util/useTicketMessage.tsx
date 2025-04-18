import { useState, useCallback } from "react";

interface Message {
  sender: string;
  message: string;
  timestamp: string;
}

interface UseTicketMessagesResult {
  messages: Message[];
  customerName: string | null;
  error: string | null;
  fetchMessages: () => Promise<void>;
}

const useTicketMessages = (ticketId: string): UseTicketMessagesResult => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tickets/${ticketId}`
      );
      if (!response.ok) throw new Error("Failed to fetch messages");

      const ticket = await response.json();
      setMessages(ticket.messages || []);
      setCustomerName(ticket.contactInfo?.name || "User");
      setError(null);
    } catch (err: any) {
      console.error("Error fetching messages:", err.message);
      setError("Failed to load messages");
    }
  }, [ticketId]);

  return { messages, customerName, error, fetchMessages };
};

export default useTicketMessages;

import { useState, useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import useTicketMessages from "../util/useTicketMessage";
import { Message } from "../types/message";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";

const TicketChat = ({ ticketId }: { ticketId: string }) => {
  const { messages, customerName, description, error, fetchMessages } =
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

  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleString();

  const descriptionMessage: Message | null = description
    ? {
        sender: customerName || "User",
        message: description,
        timestamp: new Date().toISOString(),
      }
    : null;

  const allMessages = descriptionMessage
    ? [descriptionMessage, ...messages, ...localMessages]
    : [...messages, ...localMessages];

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" mb={2} align="center">
        Chat
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mb: 2,
          px: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {allMessages.map(({ sender, message, timestamp }, idx) => {
          const isUser = sender === customerName;
          return (
            <Paper
              key={idx}
              elevation={2}
              sx={{
                alignSelf: isUser ? "flex-end" : "flex-start",
                maxWidth: "75%",
                p: 1.5,
                bgcolor: isUser ? "primary.light" : "grey.200",
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color={isUser ? "primary.dark" : "text.primary"}
              >
                {sender}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatTime(timestamp)}
              </Typography>
            </Paper>
          );
        })}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <TextField
        multiline
        minRows={3}
        placeholder="Type your message here..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />

      <Button
        variant="contained"
        onClick={handleSendMessage}
        disabled={!newMessage.trim()}
      >
        Send
      </Button>

      {error && (
        <Typography color="error" mt={2} align="center">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default TicketChat;

// src/components/TicketChat.tsx (Customer side)
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
  Stack,
} from "@mui/material";

const TicketChat = ({ ticketId }: { ticketId: string }) => {
  const {
    messages,
    customerName,
    description,
    error,
    fetchMessages,
    setMessages,
  } = useTicketMessages(ticketId);

  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !socketRef.current) return;

    const messageData: Message = {
      sender: customerName || "Customer",
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      tag: "Customer",
    };

    socketRef.current.emit("sendMessage", { ticketId, ...messageData });
    setNewMessage("");
  }, [newMessage, customerName, ticketId]);

  useEffect(() => {
    fetchMessages();

    const socket = io(import.meta.env.VITE_API_URL);
    socketRef.current = socket;

    const handleIncoming = (data: Message & { ticketId: string }) => {
      if (data.ticketId === ticketId) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("newMessage", handleIncoming);

    return () => {
      socket.off("newMessage", handleIncoming);
      socket.disconnect();
    };
  }, [fetchMessages, ticketId, setMessages]);

  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleString();

  const descriptionMessage: Message | null = description
    ? {
        sender: customerName || "Customer",
        message: description,
        timestamp: new Date().toISOString(),
        tag: "Customer",
      }
    : null;

  const allMessages: Message[] = descriptionMessage
    ? [descriptionMessage, ...messages]
    : [...messages];

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
        {allMessages.map(({ sender, message, timestamp, company }, idx) => {
          const isCustomerMessage = sender === customerName;

          return (
            <Paper
              key={idx}
              elevation={2}
              sx={{
                alignSelf: isCustomerMessage ? "flex-end" : "flex-start",
                maxWidth: "75%",
                p: 1.5,
                bgcolor: isCustomerMessage ? "primary.light" : "grey.200",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color={isCustomerMessage ? "primary.dark" : "text.primary"}
                >
                  {sender}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}
                >
                  {isCustomerMessage ? "Customer" : company || "Support"}
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                sx={{ whiteSpace: "pre-wrap", mt: 0.5 }}
              >
                {message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(timestamp).toLocaleString()}
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

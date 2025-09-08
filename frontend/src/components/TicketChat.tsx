import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { useChat, Message } from "../util/useChat";

interface TicketChatProps {
  ticketId: string;
  description: string;
  senderName: string;
  company?: string;
  maxHeight?: number | string;
}

const TicketChat = ({
  ticketId,
  description,
  senderName,
  company,
  maxHeight = "60vh",
}: TicketChatProps) => {
  const { messages, newMessage, setNewMessage, handleSendMessage, error } =
    useChat(ticketId, senderName, company);

  const descriptionMessage: Message | null = description
    ? {
        sender: "Customer",
        message: description,
        timestamp: new Date().toISOString(),
      }
    : null;

  const allMessages = descriptionMessage
    ? [descriptionMessage, ...messages]
    : messages;

  const onSendMessage = () => {
    if (!newMessage.trim()) return;
    handleSendMessage();
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: maxHeight,
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
        {allMessages.map(({ sender, company, message, timestamp }, idx) => {
          const isUser = sender === senderName;
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color={isUser ? "primary.dark" : "text.primary"}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  {sender}
                  {company && (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      {company}
                    </Typography>
                  )}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
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
        onClick={onSendMessage}
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

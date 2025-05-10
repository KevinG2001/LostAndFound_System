import { useChat } from "../util/useChat";
import { useEffect, useState } from "react";
import Styles from "../styles/chat.module.scss";
import { Message } from "../util/types/ticketType";

interface TicketChatProps {
  ticketId: string;
  description: string;
}

const TicketChat = ({ ticketId, description }: TicketChatProps) => {
  const senderName = "Support";
  const { messages, newMessage, setNewMessage, handleSendMessage, error } =
    useChat(ticketId, senderName);

  const [initialMessages, setInitialMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (description) {
      const descriptionMessage: Message = {
        sender: "Customer",
        message: description,
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [descriptionMessage, ...messages];
      setInitialMessages(updatedMessages);
    } else {
      setInitialMessages(messages);
    }
  }, [description, messages]);

  return (
    <div className={Styles.chatContainer}>
      <h3 className={Styles.chatTitle}>Chat</h3>
      <div className={Styles.messagesContainer}>
        {initialMessages.map((msg, index) => (
          <div key={index} className={Styles.message}>
            <strong className={Styles.messageSender}>{msg.sender}</strong>:{" "}
            <span className={Styles.messageText}>{msg.message}</span> <br />
            <small className={Styles.messageTimestamp}>
              {new Date(msg.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
      <textarea
        className={Styles.messageInput}
        rows={3}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button className={Styles.sendButton} onClick={handleSendMessage}>
        Send
      </button>
      {error && <p className={Styles.errorText}>{error}</p>}
    </div>
  );
};

export default TicketChat;

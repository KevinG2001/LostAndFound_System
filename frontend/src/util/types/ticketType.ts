export interface Message {
  sender: string;
  message: string;
  timestamp: string;
}

export interface Ticket {
  ticketId: string;
  description: string;
  messages: Message[];
}

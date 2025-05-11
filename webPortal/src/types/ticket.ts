import { Message } from "./message";

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Ticket {
  firstName: string;
  surname: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  description: string;
  status: "Open" | "Closed";
  dateCreated: string;
  dateLost: string;
  messages: Message[];
  contactInfo: ContactInfo;
}

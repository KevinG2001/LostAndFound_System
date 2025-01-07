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
}

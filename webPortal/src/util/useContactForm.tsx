import { useState } from "react";
import { Ticket } from "../types/ticket";

const useContactForm = () => {
  const [formData, setFormData] = useState<Ticket>({
    firstName: "",
    surname: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    description: "",
    status: "Open",
    dateLost: "",
    dateCreated: "",
    messages: [],
    contactInfo: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (field: keyof Ticket, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const ticket = {
      description: formData.description,
      contactInfo: {
        name: `${formData.firstName} ${formData.surname}`,
        email: formData.email,
        phone: `${formData.countryCode}-${formData.phoneNumber}`,
      },
      dateLost: formData.dateLost,
      status: formData.status,
      dateCreated: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tickets/submitTicket`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ticket),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit ticket");
      }

      const responseData = await response.json();
      setSuccessMessage(
        `Your ticket has been submitted! Ticket ID: ${responseData.ticketId}`
      );
      setFormData({
        firstName: "",
        surname: "",
        email: "",
        countryCode: "",
        phoneNumber: "",
        description: "",
        status: "Open",
        dateLost: "",
        dateCreated: "",
        messages: [],
        contactInfo: {
          name: "",
          email: "",
          phone: "",
        },
      });

      return responseData.ticketId;
    } catch (error: any) {
      setError(error.message);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    error,
    successMessage,
    handleChange,
    handleSubmit,
  };
};

export default useContactForm;

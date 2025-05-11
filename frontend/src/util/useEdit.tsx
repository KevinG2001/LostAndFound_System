import { useState } from "react";

type CollectionDetails = {
  firstName?: string;
  surname?: string;
  email?: string;
  phone?: string;
};

const useEdit = (id: string, type: "item" | "ticket") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const editItem = async (updatedData: {
    article?: string;
    description?: string;
    category?: string;
    type?: string;
    route?: string;
    garage?: string;
    notes?: string;
    dateLost?: string;
    status?: string;
    imageUrl?: string;
    collectionDetails?: CollectionDetails;
    dateCreated?: string;
    dateClaimed?: string;
    ticketId?: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (updatedData.dateLost && updatedData.dateLost.includes("-")) {
      const [day, month, year] = updatedData.dateLost.split("-");
      updatedData.dateLost = new Date(`${year}-${month}-${day}`)
        .toISOString()
        .split("T")[0];
    }

    const endpoint =
      type === "ticket"
        ? `${import.meta.env.VITE_API_URL}/tickets/update/${id}`
        : `${import.meta.env.VITE_API_URL}/items/update/${id}`;

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${type}`);
      }

      const updated = await response.json();
      setSuccess(true);
      console.log(`${type} updated successfully:`, updated);
    } catch (err) {
      setError((err as Error).message);
      console.error(`Error updating ${type}:`, err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    editItem,
  };
};

export default useEdit;

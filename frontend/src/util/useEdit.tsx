import { useState } from "react";

type CollectionDetails = {
  firstName?: string;
  surname?: string;
  email?: string;
  phone?: string;
};

const useEdit = (itemId: string) => {
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
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (updatedData.dateLost) {
      const [day, month, year] = updatedData.dateLost.split("-");
      updatedData.dateLost = new Date(`${year}-${month}-${day}`)
        .toISOString()
        .split("T")[0];
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/update/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();
      setSuccess(true);
      console.log("Item updated successfully:", updatedItem);
    } catch (err) {
      setError((err as Error).message);
      console.error("Error updating item:", err);
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

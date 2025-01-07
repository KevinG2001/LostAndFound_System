import { useState } from "react";

interface NewItem {
  description: string;
  category: string;
  type: string;
  route: string;
  notes: string;
  dateLost: string;
  status: string;
}

const useNewItem = () => {
  const [createdItem, setCreatedItem] = useState<NewItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createItem = async (itemData: NewItem) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "${import.meta.env.VITE_API_URL}/items/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create new item");
      }

      const data = await response.json();
      console.log("Created item data:", data);

      setCreatedItem(data);
    } catch (err: any) {
      console.error("Error creating item:", err);
      setError(err.message || "Error creating item");
    } finally {
      setLoading(false);
    }
  };

  return { createItem, createdItem, loading, error };
};

export default useNewItem;

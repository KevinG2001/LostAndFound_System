import { useState } from "react";

interface NewItem {
  description: string;
  category: string;
  type: string;
  route: string;
  notes: string;
  dateLost: string;
  status: string;
  itemID?: string;
  imageUrl?: string;
}

const useNewItem = () => {
  const [createdItem, setCreatedItem] = useState<NewItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createItem = async (itemData: NewItem, imageFile: File | null) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("description", itemData.description);
      formData.append("category", itemData.category);
      formData.append("type", itemData.type);
      formData.append("route", itemData.route);
      formData.append("notes", itemData.notes);
      formData.append("dateLost", itemData.dateLost);
      formData.append("status", itemData.status);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error Response:", errorText);
        throw new Error("Failed to create new item");
      }

      const data = await response.json();
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

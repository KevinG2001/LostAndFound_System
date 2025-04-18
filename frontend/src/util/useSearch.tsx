import { useState } from "react";

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const searchDB = async (searchFields: any) => {
    try {
      const filters: Record<string, string> = {};

      for (const [key, value] of Object.entries(searchFields)) {
        if (value.trim() !== "") {
          filters[key] = value;
        }
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filters }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search items");
      }

      const data = await response.json();
      setItems(data.items);
      setHasSearched(true);
    } catch (error) {
      console.error("Error searching for items", error);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    searchDB,
    items,
    hasSearched,
  };
};

export default useSearch;

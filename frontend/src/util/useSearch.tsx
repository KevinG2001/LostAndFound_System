import { useState } from "react";

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);

  const searchDB = async (param) => {
    try {
      const response = await fetch("http://localhost:4000/items/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          param,
          query: searchTerm,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to search items");
      }

      const data = await response.json();
      setItems(data.items);
      console.log(data);
    } catch (error) {
      console.error("Error searching for items", error);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    searchDB,
    items,
  };
};

export default useSearch;

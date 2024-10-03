import { useEffect, useState } from "react";

const useItemCount = (endpoint: string) => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://localhost:4000/items/${endpoint}`);
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching count", error);
    }
  };

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [endpoint]);
  return { items };
};

export default useItemCount;

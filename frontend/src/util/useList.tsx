import { useEffect, useState } from "react";

const useList = (resource: string, endpoint: string) => {
  const [items, setItems] = useState<any[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${resource}/${endpoint}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ${resource}`);
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(`Error fetching ${resource}`, error);
    }
  };

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [resource, endpoint]);

  return { items };
};

export default useList;

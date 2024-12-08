import { useEffect, useState } from "react";

const useList = (resource: string, endpoint: string) => {
  const [items, setItems] = useState<any[]>([]);

  const fetchItems = async () => {
    try {
      // Use dynamic endpoint based on the resource (items or tickets)
      const response = await fetch(
        `http://localhost:4000/${resource}/${endpoint}`
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
    const interval = setInterval(fetchItems, 5 * 60 * 1000); // Fetch data every 5 minutes
    return () => clearInterval(interval);
  }, [resource, endpoint]); // Re-run when resource or endpoint changes

  return { items };
};

export default useList;

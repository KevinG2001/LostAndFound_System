import { useEffect, useState } from "react";

const useItemCount = (endpoint: string) => {
  const [itemCounts, setItemCounts] = useState<any>(null); // Assuming the response is an object

  const fetchCount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/items/${endpoint}`);
      if (!response.ok) {
        throw new Error("Failed to fetch count");
      }
      const data = await response.json();
      setItemCounts(data.itemCounts); // Set the itemCounts from the response
    } catch (error) {
      console.error("Error fetching count", error);
    }
  };

  useEffect(() => {
    fetchCount(); // Call on mount
    const interval = setInterval(fetchCount, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval); // Cleanup
  }, [endpoint]); // Run again if `endpoint` changes

  return { itemCounts };
};

export default useItemCount;

import { useEffect, useState } from "react";

const useCount = (resource: string) => {
  const [counts, setCounts] = useState<any>(null); // Assuming the response is an object
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/stats/${resource}/count`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch counts");
      }
      const data = await response.json();
      console.log(`Fetched counts data:`, data);

      if (resource === "items") {
        setCounts(data.itemCounts);
      } else if (resource === "tickets") {
        setCounts(data.ticketCounts);
      }
    } catch (error) {
      console.error("Error fetching count", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [resource]);

  return { counts, loading };
};

export default useCount;

import { useEffect, useState } from "react";

const useCount = (resource: string) => {
  const [counts, setCounts] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/counts/${resource}/count`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch counts");
      }
      const data = await response.json();

      const countKey = `${resource}Counts`;
      setCounts(data[countKey]);
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

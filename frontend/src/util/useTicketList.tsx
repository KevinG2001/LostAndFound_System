import { useEffect, useState } from "react";

const useTicketList = (endpoint: string) => {
  const [tickets, setTickets] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tickets/${endpoint}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching count", error);
    }
  };

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [endpoint]);
  return { tickets };
};

export default useTicketList;

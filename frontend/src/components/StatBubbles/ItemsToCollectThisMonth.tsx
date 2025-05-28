import { useEffect, useState } from "react";
import EventIcon from "@mui/icons-material/Event";
import StatBubble from "./StatBubble";

function ItemsToCollectThisMonth() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCount() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/stats/items-to-collect-this-month`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setCount(data.count ?? 0);
      } catch (err) {
        console.error(err);
        setError("Error loading data");
      }
    }

    fetchCount();
  }, []);

  return (
    <StatBubble
      title="To Collect This Month"
      value={error || count === null ? "Loading..." : count}
      icon={EventIcon}
      iconColor="warning.main"
    />
  );
}

export default ItemsToCollectThisMonth;

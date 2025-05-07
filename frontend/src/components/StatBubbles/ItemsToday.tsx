import { useEffect, useState } from "react";
import Styles from "../../styles/stats/bubbleStat.module.scss";
import CalenderIcon from "../../assets/calenderIcon.svg?react";

function ItemsToday() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchItemsToday() {
      try {
        const today = new Date().toISOString().split("T")[0];
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/stats/items-today?date=${today}`
        );
        if (!response.ok) throw new Error("Failed to fetch items lost today");

        const data = await response.json();
        setCount(data.count ?? 0);
      } catch (err) {
        console.error(err);
        setError("Error loading data");
      }
    }

    fetchItemsToday();
  }, []);

  return (
    <div className={Styles.statBubble}>
      <CalenderIcon className={Styles.bubbleIcon} />
      <div className={Styles.statDescription}>
        <div className={Styles.statTitle}>Items Lost Today</div>
        <div className={Styles.statValue}>
          {error ? error : count !== null ? count : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default ItemsToday;

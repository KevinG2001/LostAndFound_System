import { useEffect, useState } from "react";
import Styles from "../../styles/stats/bubbleStat.module.scss";
import CalenderIcon from "../../assets/calenderIcon.svg?react";

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
    <div className={Styles.statBubble}>
      <CalenderIcon className={Styles.bubbleIcon} />
      <div className={Styles.statDescription}>
        <div className={Styles.statTitle}>To Collect This Month</div>
        <div className={Styles.statValue}>
          {error ? error : count !== null ? count : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default ItemsToCollectThisMonth;

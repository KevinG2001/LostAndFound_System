import { useEffect, useState } from "react";
import Styles from "../../styles/stats/bubbleStat.module.scss";
import ImportantItem from "../../assets/mostImportantItem.svg?react";

function TopItem() {
  const [topItem, setTopItem] = useState<string | null>("Loading...");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTopItem = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/stats/items-by-type`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top item");
        }

        const data = await response.json();

        if (data.length > 0) {
          const sorted = data.sort((a: any, b: any) => b.count - a.count);
          setTopItem(sorted[0].category);
        } else {
          setTopItem("None");
        }
      } catch (err: any) {
        console.error(err);
        setError("Error loading data");
        setTopItem("None");
      }
    };

    fetchTopItem();
  }, []);

  return (
    <div className={Styles.statBubble}>
      <ImportantItem className={Styles.bubbleIcon} />
      <div className={Styles.statDescription}>
        <div className={Styles.statTitle}>Most Lost Type</div>
        <div className={Styles.statValue}>{error ? error : topItem}</div>
      </div>
    </div>
  );
}

export default TopItem;

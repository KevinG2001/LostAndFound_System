import { useEffect, useState } from "react";
import StatBubble from "./StatBubble";
import ImportantItem from "../../assets/mostImportantItem.svg?react";

function TopItem() {
  const [topItem, setTopItem] = useState<string>("Loading...");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTopItem = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/stats/items-by-type`
        );

        if (!response.ok) throw new Error("Failed to fetch top item");

        const data = await response.json();

        if (data.length > 0) {
          const sorted = data.sort((a: any, b: any) => b.count - a.count);
          setTopItem(sorted[0].category);
        } else {
          setTopItem("None");
        }
      } catch (err) {
        console.error(err);
        setError("Error loading data");
        setTopItem("None");
      }
    };

    fetchTopItem();
  }, []);

  return (
    <StatBubble
      title="Most Lost Type"
      value={error ? error : topItem}
      icon={ImportantItem}
    />
  );
}

export default TopItem;

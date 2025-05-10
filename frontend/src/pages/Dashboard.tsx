import { useEffect, useState } from "react";
import Style from "../styles/pages/dashboard.module.scss";
import LineChart from "../components/Charts/LineChart";
import DoughnutChart from "../components/Charts/DoughtnutChart";
import TotalCount from "../components/StatBubbles/TotalCount";
import ReturnPercent from "../components/StatBubbles/ReturnPercent";
import TopItem from "../components/StatBubbles/TopItem";
import ItemsToday from "../components/StatBubbles/ItemsToday";
import { LineChartItem, DoughnutChartItem } from "../util/types/chartTypes";

function Dashboard() {
  const [lineData, setLineData] = useState<LineChartItem[]>([]);
  const [doughnutData, setDoughnutData] = useState<DoughnutChartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lineError, setLineError] = useState<string>("");
  const [doughnutError, setDoughnutError] = useState<string>("");

  async function fetchData<T>(
    url: string,
    setData: React.Dispatch<React.SetStateAction<T>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`);
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);

      const result: T = await response.json();

      if (Array.isArray(result)) {
        if (url === "/stats/items-by-type") {
          const formattedData = (
            result as { category: string; count: number }[]
          ).map((item) => ({
            label: item.category,
            value: item.count,
          }));
          setData(formattedData as T);
        } else {
          setData(result);
        }
      } else {
        setData(result);
      }
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      setError(`Error fetching data. Please try again later.`);
    }
  }

  useEffect(() => {
    fetchData<LineChartItem[]>(
      "/stats/lost-per-month",
      setLineData,
      setLineError
    );
    fetchData<DoughnutChartItem[]>(
      "/stats/typeLost",
      setDoughnutData,
      setDoughnutError
    );

    setLoading(false);
  }, []);

  return (
    <div className={Style.dashboardContainer}>
      {/* Left Side (Line & Bar Charts) */}
      <div className={Style.leftBox}>
        <div className={Style.box}>
          <LineChart data={lineData} error={lineError} loading={loading} />
        </div>
        <div className={Style.bottomBox}>
          <div className={Style.bubbleBox}>
            <TotalCount />
          </div>
          <div className={Style.bubbleBox}>
            <ReturnPercent />
          </div>
          <div className={Style.bubbleBox}>
            <TopItem />
          </div>
          <div className={Style.bubbleBox}>
            <ItemsToday />
          </div>
        </div>
      </div>

      {/* Right Side (Doughnut Chart) */}
      <div className={Style.rightBox}>
        <div className={Style.box}>
          <DoughnutChart data={doughnutData} error={doughnutError} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import Style from "../styles/pages/dashboard.module.scss";
import LineChart from "../components/Charts/LineChart";
import DoughnutChart from "../components/Charts/DoughtnutChart";
import Barchart from "../components/Charts/Barchart";

function Dashboard() {
  const [lineData, setLineData] = useState([]);
  const [doughnutData, setDoughnutData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lineError, setLineError] = useState("");
  const [doughnutError, setDoughnutError] = useState("");
  const [barError, setBarError] = useState("");

  useEffect(() => {
    async function fetchData(url, setData, setError) {
      try {
        console.log("Fetching:", `${import.meta.env.VITE_API_URL}${url}`);

        const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`);
        if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);

        const result = await response.json();

        if (url === "/stats/items-by-type") {
          const formattedData = result.map((item) => ({
            label: item.category,
            value: item.count,
          }));
          setData(formattedData);
        } else {
          setData(result);
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setError(`Error fetching data. Please try again later.`);
      }
    }

    fetchData("/stats/lost-per-month", setLineData, setLineError);
    fetchData("/stats/typeLost", setDoughnutData, setDoughnutError);
    fetchData("/stats/items-by-type", setBarData, setBarError);

    setLoading(false);
  }, []);

  return (
    <div className={Style.dashboardContainer}>
      {/* Left Side (Line & Bar Charts) */}
      <div className={Style.leftBox}>
        <div className={Style.box}>
          <LineChart data={lineData} error={lineError} loading={loading} />
        </div>
        <div className={Style.box}>
          <Barchart data={barData} error={barError} />
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

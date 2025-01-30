import { useEffect, useState } from "react";
import Style from "../styles/pages/dashboard.module.scss";
import LineChart from "../components/Charts/LineChart";
import DoughnutChart from "../components/Charts/DoughtnutChart";

function Dashboard() {
  const [lineData, setLineData] = useState([]);
  const [doughnutData, setDoughnutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lineError, setLineError] = useState("");
  const [doughnutError, setDoughnutError] = useState("");

  useEffect(() => {
    async function fetchLineData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/stats/lost-per-month`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch line chart data");
        }
        const result = await response.json();

        setLineData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching line chart data:", error);
        setLineError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    }

    fetchLineData();
  }, []);

  useEffect(() => {
    async function fetchDoughnutData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/stats/typeLost`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doughnut chart data");
        }
        const result = await response.json();
        setDoughnutData(result);
      } catch (error) {
        console.error("Error fetching doughnut chart data:", error);
        setDoughnutError(
          "Error fetching category data. Please try again later."
        );
      }
    }

    fetchDoughnutData();
  }, []);

  return (
    <div className={Style.dashboardContainer}>
      <div className={Style.leftBox}>
        <div className={Style.box}>
          <LineChart data={lineData} error={lineError} loading={loading} />
        </div>
        <div className={Style.box}>Left Box 2</div>
      </div>
      <div className={Style.rightBox}>
        <div className={Style.box}>
          <DoughnutChart data={doughnutData} error={doughnutError} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

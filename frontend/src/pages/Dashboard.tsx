import { useEffect, useState } from "react";
import { Box } from "@mui/material";
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

      if (Array.isArray(result) && url === "/stats/items-by-type") {
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
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      setError("Error fetching data. Please try again later.");
    }
  }

  useEffect(() => {
    fetchData("/stats/lost-per-month", setLineData, setLineError);
    fetchData("/stats/typeLost", setDoughnutData, setDoughnutError);
    setLoading(false);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        bgcolor: "grey.100",
        boxSizing: "border-box",
        p: 3,
        gap: 2,
        flexWrap: "nowrap",
      }}
    >
      {/* Line chart and stats  */}
      <Box
        sx={{
          flexBasis: "70%",
          flexShrink: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
        }}
      >
        {/* Line Chart */}
        <Box
          sx={{
            flex: "1 1 auto",
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 2,
            boxShadow: 3,
            overflow: "hidden",
            minHeight: 300,
          }}
        >
          <LineChart data={lineData} error={lineError} loading={loading} />
        </Box>

        {/* Stat Bubbles */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            gap: 2,
            mt: 1,
          }}
        >
          {[TotalCount, ReturnPercent, TopItem, ItemsToday].map(
            (Component, i) => (
              <Box
                key={i}
                sx={{
                  flex: "1 1 0",
                  minWidth: 0,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 1,
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Component />
              </Box>
            )
          )}
        </Box>
      </Box>

      {/*  Doughnut chart */}
      <Box
        sx={{
          flexBasis: "30%",
          flexShrink: 1,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
          p: 2,
          mr: 2,
        }}
      >
        <DoughnutChart data={doughnutData} error={doughnutError} />
      </Box>
    </Box>
  );
}

export default Dashboard;

import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { BarchartProps } from "../../util/types/chartTypes";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ data, error, loading }: BarchartProps) => {
  if (loading) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <Typography>No data available</Typography>
      </Box>
    );
  }

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Items by Category",
        data: data.map((item) => item.value),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Bar
        data={chartData}
        options={{
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Items",
              },
              ticks: {
                stepSize: 1,
              },
            },
            y: {
              title: {
                display: true,
                text: "Category",
              },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
          },
        }}
      />
    </Box>
  );
};

export default BarChart;

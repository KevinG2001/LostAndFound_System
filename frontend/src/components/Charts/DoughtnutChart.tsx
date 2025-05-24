import { Box, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DoughnutChartProps } from "../../util/types/chartTypes";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, error }: DoughnutChartProps) => {
  if (error) {
    return (
      <Box
        sx={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <Box
      sx={{
        height: 350,
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      <Doughnut
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          layout: {
            padding: 20,
          },
          plugins: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 12,
                padding: 15,
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
        }}
      />
    </Box>
  );
};

export default DoughnutChart;

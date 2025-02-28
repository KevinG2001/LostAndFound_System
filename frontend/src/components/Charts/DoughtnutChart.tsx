import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Styles from "../../styles/charts/doughnutStyles.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ data, error }) {
  if (error) {
    return <p>{error}</p>;
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
    <div className={Styles.chartContainer}>
      <Doughnut
        data={chartData}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default DoughnutChart;

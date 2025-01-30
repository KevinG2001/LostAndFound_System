import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ data, error, loading }) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Claimed",
        data: data.map((item) => item.claimed),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointRadius: 5,
        tension: 0.1,
      },
      {
        label: "Unclaimed",
        data: data.map((item) => item.unclaimed),
        fill: false,
        borderColor: "rgba(255,159,64,1)",
        pointBackgroundColor: "rgba(255,159,64,1)",
        pointRadius: 5,
        tension: 0.1,
      },
      {
        label: "Expired",
        data: data.map((item) => item.expired),
        fill: false,
        borderColor: "rgba(255,99,132,1)",
        pointBackgroundColor: "rgba(255,99,132,1)",
        pointRadius: 5,
        tension: 0.1,
      },
      {
        label: "To Collect",
        data: data.map((item) => item.toCollect),
        fill: false,
        borderColor: "rgba(153,102,255,1)",
        pointBackgroundColor: "rgba(153,102,255,1)",
        pointRadius: 5,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Items Lost per Month",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count of Items Lost",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
}

export default LineChart;

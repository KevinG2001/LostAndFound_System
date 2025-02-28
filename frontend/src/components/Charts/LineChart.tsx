import { Line } from "react-chartjs-2";
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
import variables from "../../styles/variables/colours.module.scss";

// Registering the required chart components
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
        borderColor: variables.claimedColour,
        pointBackgroundColor: variables.claimedColour,
        pointRadius: 5,
        tension: 0.1,
      },
      {
        label: "Unclaimed",
        data: data.map((item) => item.unclaimed),
        fill: false,
        borderColor: variables.unclaimedColour,
        pointBackgroundColor: variables.unclaimedColour,
        pointRadius: 5,
        tension: 0.1,
      },
      {
        label: "Expired",
        data: data.map((item) => item.expired),
        fill: false,
        borderColor: variables.expiredColour,
        pointBackgroundColor: variables.expiredColour,
        pointRadius: 5,
        tension: 0.1,
      },
      {
        label: "To Collect",
        data: data.map((item) => item.toCollect),
        fill: false,
        borderColor: variables.tocollectColour,
        pointBackgroundColor: variables.tocollectColour,
        pointRadius: 5,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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

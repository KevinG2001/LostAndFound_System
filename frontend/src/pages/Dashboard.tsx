import { Box } from "@mui/material";
import LineChart from "../components/Charts/LineChart";
import DoughnutChart from "../components/Charts/DoughtnutChart";
import BarChart from "../components/Charts/Barchart";
import TotalCount from "../components/StatBubbles/TotalCount";
import ReturnPercent from "../components/StatBubbles/ReturnPercent";
import TopItem from "../components/StatBubbles/TopItem";
import ItemsToday from "../components/StatBubbles/ItemsToday";
import useStatistics from "../util/useStatistics";

function Dashboard() {
  const {
    lineData,
    doughnutData,
    statusData,
    loading,
    lineError,
    statusError,
  } = useStatistics();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "nowrap",
        width: "100%",
        boxSizing: "border-box",
        bgcolor: "grey.100",
        height: "100%",
        p: 2,
      }}
    >
      {/* Left side: Line chart + Doughnut side-by-side + Stats */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
        }}
      >
        {/* Top charts container: line + doughnut */}
        <Box sx={{ display: "flex", gap: 2, flexGrow: 1, minHeight: 300 }}>
          <Box
            sx={{
              flex: 1,
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 2,
              boxShadow: 3,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <LineChart data={lineData} error={lineError} loading={loading} />
          </Box>

          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 260,
              flexBasis: "30%",
              flexShrink: 0,
            }}
          >
            <DoughnutChart
              data={statusData}
              error={statusError}
              loading={loading}
            />
          </Box>
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
                  flex: "1 1 250px",
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

      {/* Right side: Bar chart */}
      <Box
        sx={{
          flexBasis: "30%",
          flexShrink: 1,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <BarChart data={doughnutData} error={statusError} loading={loading} />
      </Box>
    </Box>
  );
}

export default Dashboard;

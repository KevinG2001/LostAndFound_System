import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/ItemsPage";
import Tickets from "./pages/TicketsPage";
import { SnackbarProvider } from "notistack";

import { Box, CssBaseline } from "@mui/material";
import Containers from "./pages/Containers";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
        <CssBaseline />
        <Navbar />

        {/* Page content */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/items" element={<Items />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/containers" element={<Containers />} />
            </Routes>
          </SnackbarProvider>
        </Box>
      </Box>
    </Router>
  );
}

export default App;

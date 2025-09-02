import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/ItemsPage";
import Tickets from "./pages/TicketsPage";
import { Box, CssBaseline } from "@mui/material";
import Containers from "./pages/ContainersPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
        <CssBaseline />
        <Navbar />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/items" element={<Items />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/containers" element={<Containers />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;

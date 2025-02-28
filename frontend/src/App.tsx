//Main App file
//Holds all routes to other files

import "./App.css";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/ItemsPage";
import Tickets from "./pages/TicketsPage";

function App() {
  return (
    <>
      <div id="root">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<Items />} />
            <Route path="/tickets" element={<Tickets />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

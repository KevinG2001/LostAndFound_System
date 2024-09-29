//Main App file
//Holds all routes to other files

import "./App.css";
import Navbar from "./components/Navbar";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";

function App() {
  return (
    <>
      <div id="root">
        <Router>
          {" "}
          {/* Wrap everything in HashRouter */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<Items />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

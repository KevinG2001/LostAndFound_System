//Main App file
//Holds all routes to other files

import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div id="root">
        <Navbar />
        <div>This will be the landing page</div>
      </div>
    </>
  );
}

export default App;

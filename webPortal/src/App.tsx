import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Style from "./styles/home.module.scss";

function App() {
  return (
    <>
      <div className={Style.container}>
        <About />
        <div>This is my web portal</div>
        <Contact />
      </div>
    </>
  );
}

export default App;

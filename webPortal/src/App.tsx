import { useState } from "react";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import TicketChat from "./components/TicketChat";
import Style from "./styles/home.module.scss";

function App() {
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [inputTicketId, setInputTicketId] = useState<string>("");

  const handleTicketCreated = (id: string) => {
    setTicketId(id);
  };

  const handleResetTicket = () => {
    setTicketId(null);
  };

  const handleTicketIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTicketId(e.target.value);
  };

  const handleTicketIdSubmit = () => {
    if (inputTicketId) {
      setTicketId(inputTicketId);
    }
  };

  return (
    <div className={Style.container}>
      <About />
      <div>This is my web portal</div>
      <div>
        {ticketId ? (
          <div>
            <button
              onClick={handleResetTicket}
              style={{ marginBottom: "10px" }}
            >
              Create New Ticket
            </button>
            <TicketChat ticketId={ticketId} />
          </div>
        ) : (
          <div>
            <div>
              <h3>Reopen Your Ticket</h3>
              <input
                type="text"
                value={inputTicketId}
                onChange={handleTicketIdChange}
                placeholder="Enter your ticket ID"
                style={{ marginRight: "10px" }}
              />
              <button onClick={handleTicketIdSubmit}>Reopen Ticket</button>
            </div>
            <Contact onTicketCreated={handleTicketCreated} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

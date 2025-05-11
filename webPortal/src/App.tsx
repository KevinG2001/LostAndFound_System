import { useState } from "react";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import TicketChat from "./components/TicketChat";
import Style from "./styles/home.module.scss";

function App() {
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [inputTicketId, setInputTicketId] = useState<string>("");
  const [view, setView] = useState<"initial" | "reopen" | "create">("initial");

  const handleTicketCreated = (id: string) => {
    setTicketId(id);
  };

  const handleResetTicket = () => {
    setTicketId(null);
    setInputTicketId("");
    setView("initial");
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
      <div>
        {ticketId ? (
          <div>
            <button onClick={handleResetTicket} className={Style.btn}>
              Back to Menu
            </button>
            <TicketChat ticketId={ticketId} />
          </div>
        ) : (
          <>
            {view === "initial" && (
              <div className={Style.btnWrapper}>
                <button onClick={() => setView("reopen")} className={Style.btn}>
                  Go to Chat
                </button>
                <button onClick={() => setView("create")} className={Style.btn}>
                  Create Ticket
                </button>
              </div>
            )}

            {view === "reopen" && (
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
                <div>
                  <button
                    onClick={() => setView("initial")}
                    className={Style.btn}
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {view === "create" && (
              <div>
                <Contact onTicketCreated={handleTicketCreated} />
                <button
                  onClick={() => setView("initial")}
                  className={Style.btn}
                >
                  Back
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import TicketChat from "./components/TicketChat";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";

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
    if (inputTicketId.trim()) {
      setTicketId(inputTicketId.trim());
    }
  };

  return (
    <>
      <About />
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3, pt: 0 }}>
        <Box sx={{ mt: 1 }}>
          {ticketId ? (
            <Box>
              <Button
                variant="outlined"
                onClick={handleResetTicket}
                sx={{ mb: 2 }}
              >
                Back to Menu
              </Button>
              <TicketChat ticketId={ticketId} />
            </Box>
          ) : (
            <>
              {view === "initial" && (
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button variant="contained" onClick={() => setView("reopen")}>
                    Go to Chat
                  </Button>
                  <Button variant="contained" onClick={() => setView("create")}>
                    Create Ticket
                  </Button>
                </Stack>
              )}

              {view === "reopen" && (
                <Box textAlign="center">
                  <Typography variant="h5" gutterBottom>
                    Reopen Your Ticket
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >
                    <TextField
                      label="Ticket ID"
                      value={inputTicketId}
                      onChange={handleTicketIdChange}
                      sx={{ mr: 2 }}
                    />
                    <Button variant="contained" onClick={handleTicketIdSubmit}>
                      Reopen Ticket
                    </Button>
                  </Box>
                  <Button variant="outlined" onClick={() => setView("initial")}>
                    Back
                  </Button>
                </Box>
              )}

              {view === "create" && (
                <Box>
                  <Contact onTicketCreated={handleTicketCreated} />
                  <Button
                    variant="outlined"
                    onClick={() => setView("initial")}
                    sx={{ mt: 2 }}
                  >
                    Back
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/theme.tsx";
import { SnackbarProvider } from "notistack";
import { ItemSelectionProvider } from "./util/useItemSelection.tsx";
import { AuthProvider } from "./util/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
    >
      <AuthProvider>
        <ItemSelectionProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ItemSelectionProvider>
      </AuthProvider>
    </SnackbarProvider>
  </StrictMode>
);

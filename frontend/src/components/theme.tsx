import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009a44",
      dark: "#003865",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffd700",
      contrastText: "#333333",
    },
    error: {
      main: "#ff0000",
    },
    success: {
      main: "#22a03f",
    },
    info: {
      main: "#27dbcc",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
      disabled: "#d1d1d1",
    },
    background: {
      default: "#1a2224",
      paper: "#ffffff",
    },
    divider: "#d1d1d1",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#222d31",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#009a44",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#007acc",
          "&:hover": {
            color: "#005b84",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          borderColor: "#e8e8e8",
        },
      },
    },
  },
});

export default theme;

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009a44", // $primary-colour
      dark: "#003865", // $secondary-colour (used as dark variant)
      contrastText: "#fff", // Text color on primary buttons etc.
    },
    secondary: {
      main: "#ffd700", // $accent-colour
      contrastText: "#333333", // primary text colour maybe?
    },
    error: {
      main: "#ff0000", // $expired-colour
    },
    success: {
      main: "#22a03f", // $claimed-colour
    },
    info: {
      main: "#27dbcc", // $tocollect-colour
    },
    text: {
      primary: "#333333", // $primary-text-colour
      secondary: "#666666", // $secondary-text-colour
      disabled: "#d1d1d1", // Using border colour or something similar
    },
    background: {
      default: "#1a2224", // $primary-bg-colour
      paper: "#ffffff", // $tiertiary-bg-colour
    },
    divider: "#d1d1d1", // $border-colour
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#222d31", // $button-bg-colour
          color: "#ffffff", // $button-text-colour
          "&:hover": {
            backgroundColor: "#009a44", // $button-hover-bg-colour
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#007acc", // $link-colour
          "&:hover": {
            color: "#005b84", // $link-hover-colour
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // $form-input-bg-colour
          borderColor: "#e8e8e8", // $form-input-border-colour (you might need to target outlined variant)
        },
      },
    },
  },
});

export default theme;

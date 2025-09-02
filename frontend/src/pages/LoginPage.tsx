import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

function LoginPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          backgroundColor: "#f5f5f5",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          minWidth: 300,
        }}
      >
        <Typography variant="h5">Login</Typography>

        <TextField label="Username" variant="outlined" />
        <TextField label="Password" variant="outlined"></TextField>
        <Button>Login</Button>
      </Box>
    </Box>
  );
}

export default LoginPage;

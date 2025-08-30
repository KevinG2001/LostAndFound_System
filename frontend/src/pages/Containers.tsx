import { Box, Container } from "@mui/material";

function Containers() {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "grey.100",
        pb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 1,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        Container Page
      </Box>
    </Container>
  );
}

export default Containers;

import { Box, Typography, Container } from "@mui/material";

function About() {
  return (
    <>
      {/* Navbar */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.default",
          py: 2,
          display: "flex",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{ color: "common.white", fontWeight: "bold" }}
        >
          Track
          <Box
            component="span"
            sx={{ color: "success.main", mx: 1, fontWeight: "bold" }}
          >
            It
          </Box>
          Down
        </Typography>
      </Box>

      {/* Hero section */}
      <Container sx={{ py: 1, textAlign: "center", color: "text.primary" }}>
        <Typography variant="body1" mb={0.5}>
          Did you lose something on one of our services?
        </Typography>
        <Typography variant="body1" mb={0}>
          Submit a ticket here and someone will contact you about how we can
          Track It Down!
        </Typography>
      </Container>
    </>
  );
}

export default About;

import { useState } from "react";
import useContactForm from "../util/useContactForm";
import {
  Paper,
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const Contact = ({
  onTicketCreated,
}: {
  onTicketCreated: (id: string) => void;
}) => {
  const {
    formData,
    isSubmitting,
    error,
    successMessage,
    handleChange,
    handleSubmit,
  } = useContactForm();

  const [newTicketId, setNewTicketId] = useState<string | null>(null);

  const handleSubmitWithCallback = async () => {
    const responseId = await handleSubmit();
    if (responseId) {
      setNewTicketId(responseId);

      setTimeout(() => {
        onTicketCreated(responseId);
      }, 3000);
    }
  };

  return (
    // Show affect from mui (Makes the box pop)
    <Paper
      elevation={8}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Box
        component="form"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmitWithCallback();
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" gutterBottom>
          Lost Item Form
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please fill out the form details correctly and accurately, and we will
          try to help you Track It Down!
        </Typography>

        {/* First Name and Surname */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Surname"
            value={formData.surname}
            onChange={(e) => handleChange("surname", e.target.value)}
            fullWidth
            required
          />
        </Box>

        {/* Country Code and Phone Number */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Area (Country Code)"
            value={formData.countryCode}
            onChange={(e) => handleChange("countryCode", e.target.value)}
            fullWidth
            placeholder="+1"
            required
          />
          <TextField
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            fullWidth
            required
          />
        </Box>

        {/* Email and Date Lost */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Date Lost"
            type="date"
            value={formData.dateLost}
            onChange={(e) => handleChange("dateLost", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
          />
        </Box>

        {/* Description */}
        <TextField
          label="Description"
          placeholder="Describe the item you lost"
          multiline
          minRows={4}
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          fullWidth
          required
          sx={{ mb: 3 }}
        />

        {/* Submit Button */}
        <Box sx={{ position: "relative" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            fullWidth
          >
            Submit
          </Button>
          {isSubmitting && (
            <CircularProgress
              size={24}
              sx={{
                color: "primary.main",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>

        {/* Error Message */}
        {error && (
          <Typography color="error.main" mt={2}>
            {error}
          </Typography>
        )}

        {/* Success Message */}
        {successMessage && newTicketId && (
          <Typography color="success.main" mt={2}>
            {successMessage}
            <br />
            <strong>Opening your chat now...</strong>
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Contact;

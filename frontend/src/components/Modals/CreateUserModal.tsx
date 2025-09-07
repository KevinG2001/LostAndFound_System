import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import { useSnackbar } from "notistack";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated?: () => void; // optional callback to refresh table
}

// Define your roles
const roles = ["Employee", "Manager", "Admin"];

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onUserCreated,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    Username: "",
    Password: "",
    Firstname: "",
    Surname: "",
    Company: "",
    Location: "",
    Role: "Employee",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Trim all fields and validate
    const { Username, Password, Firstname, Surname, Company, Location, Role } =
      form;

    if (
      !Username.trim() ||
      !Password.trim() ||
      !Firstname.trim() ||
      !Surname.trim() ||
      !Company.trim() ||
      !Location.trim() ||
      !Role.trim()
    ) {
      enqueueSnackbar("All fields are required", { variant: "warning" });
      return;
    }

    // Debug log
    console.log("Submitting form:", form);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create user");

      enqueueSnackbar("User created successfully!", { variant: "success" });

      // Reset form
      setForm({
        Username: "",
        Password: "",
        Firstname: "",
        Surname: "",
        Company: "",
        Location: "",
        Role: "Employee",
      });

      onUserCreated?.();
      onClose();
    } catch (err: any) {
      console.error(err);
      enqueueSnackbar(err.message || "Error creating user", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Username"
            name="Username"
            value={form.Username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            name="Password"
            type="password"
            value={form.Password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="First Name"
            name="Firstname"
            value={form.Firstname}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Surname"
            name="Surname"
            value={form.Surname}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Company"
            name="Company"
            value={form.Company}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Location"
            name="Location"
            value={form.Location}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            select
            label="Role"
            name="Role"
            value={form.Role || "Employee"}
            onChange={handleChange}
            fullWidth
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserModal;

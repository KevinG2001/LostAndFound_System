import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useAuth } from "../util/AuthContext";
import TableView from "../components/Views/TableView";
import { useItemSelection } from "../util/useItemSelection";
import { useSnackbar } from "notistack";

interface User {
  userId: string;
  Username: string;
  Firstname: string;
  Surname: string;
  role: string;
  permissions: string[];
}

function AdminPage() {
  // ! Clean up fetchs and make custom hook?
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();
  const { selectedItems, setSelectedItems } = useItemSelection();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    { header: "Username", accessor: "Username" },
    { header: "First Name", accessor: "Firstname" },
    { header: "Surname", accessor: "Surname" },
    { header: "Role", accessor: "role" },
  ];

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      enqueueSnackbar("Error fetching users", { variant: "error" });
    }
  };

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  const handleDeleteClick = () => {
    if (!selectedItems.length) return;
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmOpen(false);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedItems }),
      });

      if (!res.ok) throw new Error("Failed to delete users");

      await fetchUsers();
      setSelectedItems([]);
      enqueueSnackbar("Selected users deleted successfully!", {
        variant: "success",
      });
    } catch (err) {
      console.error("Error deleting users:", err);
      enqueueSnackbar("Failed to delete users.", { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "grey.100",
        pb: 2,
        px: 2,
      }}
    >
      <Typography variant="h4" mb={2}>
        Users
      </Typography>

      <TableView
        columns={columns}
        data={users}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />

      <Box mt={2} display="flex" gap={2}>
        <Button sx={{ bgcolor: "green", color: "white" }}>Create User</Button>
        <Button
          sx={{ bgcolor: "red", color: "white" }}
          onClick={handleDeleteClick}
          disabled={selectedItems.length === 0}
        >
          Delete Selected
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedItems.length} selected
          user(s)?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminPage;

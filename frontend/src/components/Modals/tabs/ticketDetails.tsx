import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import TicketChat from "../../TicketChat";
import useEdit from "../../../util/useEdit";

const TicketDetailsTab = ({ data }: { data: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(data.status || "");
  const { loading, editItem } = useEdit(data?.ticketId, "ticket");

  useEffect(() => {
    setEditedStatus(data.status || "");
  }, [data]);

  const handleStatusChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setEditedStatus(e.target.value as string);
  };

  const handleSave = async () => {
    try {
      await editItem({ ...data, status: editedStatus });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Ticket Details
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Ticket ID:
          </Typography>
          <Typography variant="body1">{data.ticketId}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Ticket Status:
          </Typography>
          {isEditing ? (
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={editedStatus}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Typography variant="body1">{data.status}</Typography>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Date Lost:
          </Typography>
          <Typography variant="body1">{data.dateLost}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Date Created:
          </Typography>
          <Typography variant="body1">{data.dateCreated}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {isEditing ? (
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Button variant="contained" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button variant="outlined" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Box>
      ) : (
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </Box>
      )}

      <Box>
        <TicketChat ticketId={data.ticketId} description={data.description} />
      </Box>
    </Box>
  );
};

export default TicketDetailsTab;

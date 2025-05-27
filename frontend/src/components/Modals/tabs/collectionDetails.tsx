// src/components/CollectionDetailsTab.tsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";
import useEdit from "../../../util/useEdit";

function CollectionDetailsTab({ data }: { data: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
  });

  const { loading, editItem } = useEdit(data?.itemID, "item");

  useEffect(() => {
    if (data?.collectionDetails) {
      setEditedData({
        firstName: data.collectionDetails.firstName || "",
        surname: data.collectionDetails.surname || "",
        email: data.collectionDetails.email || "",
        phone: data.collectionDetails.phone || "",
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await editItem({
        collectionDetails: editedData,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving collection details:", err);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        px: 2,
        mt: 3,
      }}
    >
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
        <Box>
          <Typography variant="subtitle2">Firstname:</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="firstName"
              value={editedData.firstName}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
            />
          ) : (
            <Typography>{editedData.firstName}</Typography>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle2">Surname:</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="surname"
              value={editedData.surname}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
            />
          ) : (
            <Typography>{editedData.surname}</Typography>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle2">Email:</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="email"
              value={editedData.email}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
            />
          ) : (
            <Typography>{editedData.email}</Typography>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle2">Phone Number:</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              name="phone"
              value={editedData.phone}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
            />
          ) : (
            <Typography>{editedData.phone}</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        {isEditing ? (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={loading}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Stack>
        ) : (
          <Button variant="outlined" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default CollectionDetailsTab;

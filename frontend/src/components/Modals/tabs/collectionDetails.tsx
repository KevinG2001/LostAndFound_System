import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Stack } from "@mui/material";
import useEdit from "../../../util/useEdit";
import { ItemData } from "../../../util/types/itemTypes";

interface CollectionDetailsTabProps {
  data: ItemData;
  onUpdate?: (updatedItem: ItemData) => void;
}

function CollectionDetailsTab({ data, onUpdate }: CollectionDetailsTabProps) {
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
      setEditedData({ ...data.collectionDetails });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await editItem({ collectionDetails: editedData });

      if (onUpdate) {
        onUpdate({ ...data, collectionDetails: editedData });
      }

      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", px: 2, mt: 3 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
        {["firstName", "surname", "email", "phone"].map((field) => (
          <Box key={field}>
            <Typography variant="subtitle2">
              {field === "firstName"
                ? "Firstname:"
                : field === "surname"
                ? "Surname:"
                : field === "email"
                ? "Email:"
                : "Phone Number:"}
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                name={field}
                value={editedData[field as keyof typeof editedData]}
                onChange={handleInputChange}
                size="small"
              />
            ) : (
              <Typography>
                {editedData[field as keyof typeof editedData]}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        {isEditing ? (
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSave} disabled={loading}>
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

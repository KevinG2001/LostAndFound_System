import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Typography,
  Stack,
} from "@mui/material";
import { useSnackbar } from "notistack"; // ✅ Import snackbar
import useEdit from "../../../util/useEdit";

const ItemDetailsTab = ({ data }: { data: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    article: "",
    itemID: "",
    description: "",
    category: "",
    type: "",
    route: "",
    garage: "",
    dateLost: "",
    status: "",
    dateClaimed: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const imageUrlRef = useRef<string | null>(null);

  const { loading, editItem } = useEdit(data?.itemID, "item");
  const { enqueueSnackbar } = useSnackbar(); // ✅ Hook

  useEffect(() => {
    if (data) {
      setEditedData({
        article: data.article || "",
        itemID: data.itemID || "",
        description: data.description || "",
        category: data.category || "",
        type: data.type || "",
        route: data.route || "",
        garage: data.garage || "",
        dateLost: data.dateLost || "",
        status: data.status || "",
        dateClaimed: data.dateClaimed || "",
      });
      imageUrlRef.current = data.imageUrl || null;
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSave = async () => {
    const updatedData = { ...editedData };
    if (data.status !== "Claimed" && editedData.status === "Claimed") {
      updatedData.dateClaimed = new Date().toISOString();
    }

    try {
      await editItem(updatedData);
      enqueueSnackbar("Item updated successfully", { variant: "success" }); // ✅ Success
      setIsEditing(false);
    } catch (err) {
      enqueueSnackbar("Failed to update item", { variant: "error" }); // ❌ Error
      console.error(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("itemID", editedData.itemID);
    setUploading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/file/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      imageUrlRef.current = result.imageUrl;
      enqueueSnackbar("Image uploaded successfully", { variant: "success" }); // ✅ Optional
    } catch (e) {
      enqueueSnackbar("Image upload failed", { variant: "error" }); // ❌ Optional
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Stack spacing={2}>
        <TextField
          label="Article"
          name="article"
          value={editedData.article}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditing}
        />

        <TextField
          label="Description"
          name="description"
          value={editedData.description}
          onChange={handleInputChange}
          fullWidth
          disabled={!isEditing}
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="Category"
            name="category"
            value={editedData.category}
            onChange={handleInputChange}
            fullWidth
            disabled={!isEditing}
          />
          <TextField
            label="Type"
            name="type"
            value={editedData.type}
            onChange={handleInputChange}
            fullWidth
            disabled={!isEditing}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextField
            label="Route"
            name="route"
            value={editedData.route}
            onChange={handleInputChange}
            fullWidth
            disabled={!isEditing}
          />
          <TextField
            label="Garage"
            name="garage"
            value={editedData.garage}
            onChange={handleInputChange}
            fullWidth
            disabled={!isEditing}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextField
            type="date"
            label="Date Lost"
            name="dateLost"
            value={editedData.dateLost}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            disabled={!isEditing}
          />
          <FormControl fullWidth disabled={!isEditing}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={editedData.status}
              onChange={handleInputChange}
              label="Status"
            >
              <MenuItem value="Unclaimed">Unclaimed</MenuItem>
              <MenuItem value="Claimed">Claimed</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
              <MenuItem value="To Collect">To Collect</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {isEditing && (
          <>
            <Typography variant="subtitle2">Upload Image</Typography>
            <input type="file" onChange={handleFileChange} />
          </>
        )}

        <Box mt={2} display="flex" gap={2}>
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                variant="contained"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outlined">
              Edit
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ItemDetailsTab;

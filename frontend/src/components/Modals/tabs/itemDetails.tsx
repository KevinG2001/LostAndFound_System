import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useSnackbar } from "notistack";
import useEdit from "../../../util/useEdit";
import { ItemData, ItemDetailsTabProps } from "../../../util/types/itemTypes";

const ItemDetailsTab = ({
  data,
  isEditing,
  setIsEditing,
}: ItemDetailsTabProps) => {
  const initialState: ItemData = {
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
    imageUrl: "",
    notes: "",
  };

  const [editedData, setEditedData] = useState<ItemData>(initialState);
  const { loading, editItem } = useEdit(data?.itemID, "item");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data) {
      setEditedData((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }, [data]);

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>): void => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const updatedData = { ...editedData };
    if (data.status !== "Claimed" && editedData.status === "Claimed") {
      updatedData.dateClaimed = new Date().toISOString();
    }

    try {
      await editItem(updatedData);
      enqueueSnackbar("Item updated successfully", { variant: "success" });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to update item", { variant: "error" });
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <Stack spacing={2}>
        <TextField
          label="Article"
          name="article"
          value={editedData.article}
          onChange={handleTextFieldChange}
          fullWidth
          disabled={!isEditing}
        />

        <TextField
          label="Description"
          name="description"
          value={editedData.description}
          onChange={handleTextFieldChange}
          fullWidth
          disabled={!isEditing}
        />

        {/* category / type */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TextField
              label="Category"
              name="category"
              value={editedData.category}
              onChange={handleTextFieldChange}
              fullWidth
              disabled={!isEditing}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TextField
              label="Type"
              name="type"
              value={editedData.type}
              onChange={handleTextFieldChange}
              fullWidth
              disabled={!isEditing}
            />
          </Box>
        </Stack>

        {/* route / garage */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TextField
              label="Route"
              name="route"
              value={editedData.route}
              onChange={handleTextFieldChange}
              fullWidth
              disabled={!isEditing}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TextField
              label="Garage"
              name="garage"
              value={editedData.garage}
              onChange={handleTextFieldChange}
              fullWidth
              disabled={!isEditing}
            />
          </Box>
        </Stack>

        {/* date lost / status */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TextField
              type="date"
              label="Date Lost"
              name="dateLost"
              value={editedData.dateLost}
              onChange={handleTextFieldChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={!isEditing}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <FormControl fullWidth disabled={!isEditing}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={editedData.status}
                onChange={handleSelectChange}
                label="Status"
              >
                <MenuItem value="Unclaimed">Unclaimed</MenuItem>
                <MenuItem value="Claimed">Claimed</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
                <MenuItem value="To Collect">To Collect</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        {/* buttons */}
        <Box mt={2} display="flex" gap={2} flexWrap="wrap">
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                variant="contained"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
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

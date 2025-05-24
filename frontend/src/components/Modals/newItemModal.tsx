import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
} from "@mui/material";
import { useSnackbar } from "notistack";
import useNewItem from "../../util/useNewItem";

interface NewItemModalProps {
  onClose: () => void;
  onCreate: (newItem: any) => void;
}

const NewItemModal = ({ onClose, onCreate }: NewItemModalProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    article,
    description,
    category,
    type,
    route,
    garage,
    notes,
    dateLost,

    filteredGarages,
    filteredRoutes,
    filteredCategories,
    filteredTypes,

    showRouteDropdown,
    showCategoryDropdown,
    showTypeDropdown,
    showGarageDropdown,

    categoryDropdownRef,
    typeDropdownRef,
    routeDropdownRef,
    garageDropdownRef,

    handleRouteChange,
    handleRouteSelect,
    handleCategoryChange,
    handleCategorySelect,
    handleTypeChange,
    handleTypeSelect,
    handleGarageChange,
    handleGarageSelect,
    handleImageChange,
    setArticle,
    setDescription,
    setNotes,
    setDateLost,

    createItem,
    loading,
    error,
  } = useNewItem();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createItem();
    if (result) {
      enqueueSnackbar("Item saved", { variant: "success" });
      onCreate(result);
      onClose();
    } else if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Item</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Button variant="outlined" component="label">
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          <TextField
            label="Article"
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            inputProps={{ maxLength: 100 }}
            required
            fullWidth
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            inputProps={{ maxLength: 256 }}
            required
            fullWidth
            helperText={`${description.length}/256`}
          />

          <Box display="flex" gap={2}>
            <Box flex={1} ref={categoryDropdownRef}>
              <TextField
                label="Category"
                value={category}
                onChange={handleCategoryChange}
                onFocus={() => showCategoryDropdown}
                required
                fullWidth
              />
              {showCategoryDropdown && (
                <Paper>
                  {filteredCategories.map((option, i) => (
                    <MenuItem
                      key={i}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleCategorySelect(option);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Paper>
              )}
            </Box>

            <Box flex={1} ref={typeDropdownRef}>
              <TextField
                label="Type"
                value={type}
                onChange={handleTypeChange}
                onFocus={() => showTypeDropdown}
                required
                fullWidth
              />
              {showTypeDropdown && (
                <Paper>
                  {filteredTypes.map((option, i) => (
                    <MenuItem
                      key={i}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleTypeSelect(option);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Paper>
              )}
            </Box>
          </Box>

          <Box display="flex" gap={2}>
            <Box flex={1} ref={routeDropdownRef}>
              <TextField
                label="Route"
                value={route}
                onChange={handleRouteChange}
                onFocus={() => showRouteDropdown}
                required
                fullWidth
              />
              {showRouteDropdown && (
                <Paper>
                  <MenuItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleRouteSelect("N/A");
                    }}
                  >
                    N/A
                  </MenuItem>
                  {filteredRoutes.map((option, i) => (
                    <MenuItem
                      key={i}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleRouteSelect(option);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Paper>
              )}
            </Box>

            <Box flex={1} ref={garageDropdownRef}>
              <TextField
                label="Garage"
                value={garage}
                onChange={handleGarageChange}
                onFocus={() => showGarageDropdown}
                required
                fullWidth
              />
              {showGarageDropdown && (
                <Paper>
                  <MenuItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleGarageSelect("N/A");
                    }}
                  >
                    N/A
                  </MenuItem>
                  {filteredGarages.map((option, i) => (
                    <MenuItem
                      key={i}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleGarageSelect(option.garageName);
                      }}
                    >
                      {option.garageName}
                    </MenuItem>
                  ))}
                </Paper>
              )}
            </Box>
          </Box>

          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={2}
            fullWidth
          />

          <TextField
            label="Date Lost"
            type="date"
            value={dateLost}
            onChange={(e) => setDateLost(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={20} /> : "Create"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewItemModal;

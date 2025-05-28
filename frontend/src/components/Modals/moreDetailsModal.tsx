import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  IconButton,
  Box,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSnackbar } from "notistack";

import ItemDetailsTab from "./tabs/itemDetails";
import TicketDetailsTab from "./tabs/ticketDetails";
import CollectionDetailsTab from "./tabs/collectionDetails";
import HistoryTab from "./tabs/historyDetails";

import { ItemData } from "../../util/types/itemTypes";
import { Ticket } from "../../util/types/ticketType";

interface MoreDetailsModalPropsItem {
  isOpen: boolean;
  onClose: () => void;
  type: "item";
  data: ItemData;
}

interface MoreDetailsModalPropsTicket {
  isOpen: boolean;
  onClose: () => void;
  type: "ticket";
  data: Ticket;
}

type MoreDetailsModalProps =
  | MoreDetailsModalPropsItem
  | MoreDetailsModalPropsTicket;

const MoreDetailsModal = ({
  isOpen,
  onClose,
  data,
  type,
}: MoreDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  useEffect(() => {
    setActiveTab("details");
    setIsEditing(false);
  }, [type, isOpen]);

  useEffect(() => {
    if (type === "item") {
      setImageUrl(data.imageUrl ?? null);
    } else {
      setImageUrl(null);
    }
  }, [data, type]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) =>
    setActiveTab(newValue);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleUploadImage = async (file: File) => {
    if (!file) return;

    if (type !== "item") return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("itemID", data.itemID);

    setUploading(true);
    handleMenuClose();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/items/file/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();
      setImageUrl(result.imageUrl);
      enqueueSnackbar("Image uploaded successfully", { variant: "success" });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Image upload failed", { variant: "error" });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleUploadImage(file);

    e.target.value = "";
  };

  const handleDeleteImage = async () => {
    if (type !== "item") return;
    if (!data?.itemID || !imageUrl) return;

    setUploading(true);
    handleMenuClose();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/items/file/delete/${data.itemID}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Delete request failed");

      setImageUrl(null);
      enqueueSnackbar("Image deleted", { variant: "info" });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to delete image", { variant: "error" });
    } finally {
      setUploading(false);
    }
  };

  if (!data) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return type === "item" ? (
          <ItemDetailsTab
            data={data}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        ) : (
          <TicketDetailsTab data={data} />
        );
      case "collection":
        return <CollectionDetailsTab data={data} />;
      case "history":
        return <HistoryTab data={data} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {type === "item"
          ? `Item ID: ${data.itemID}`
          : `Ticket ID: ${data.ticketId}`}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Only items show image upload */}
        {type === "item" && (
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 200,
                aspectRatio: "1 / 1",
                borderRadius: 2,
                border: "1px dashed #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                backgroundColor: "#fafafa",
                position: "relative",
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Item"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <AddPhotoAlternateIcon sx={{ fontSize: 48, color: "#aaa" }} />
              )}

              <IconButton
                aria-label="image options"
                onClick={handleMenuOpen}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.7)",
                  },
                }}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>

              <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </Box>

            <Menu
              anchorEl={menuAnchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <label htmlFor="image-upload-input" style={{ width: "100%" }}>
                <MenuItem
                  disabled={uploading}
                  onClick={() => {}}
                  sx={{ cursor: uploading ? "default" : "pointer" }}
                >
                  <CloudUploadIcon fontSize="small" sx={{ mr: 1 }} />
                  Upload Image
                  {uploading && (
                    <CircularProgress
                      size={18}
                      sx={{ ml: 1 }}
                      color="inherit"
                    />
                  )}
                </MenuItem>
              </label>
              <MenuItem onClick={handleDeleteImage} disabled={!imageUrl}>
                <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                Delete Image
              </MenuItem>
            </Menu>
          </Box>
        )}

        {/* Tabs only for items */}
        {type === "item" && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Details" value="details" />
              <Tab label="Collection Details" value="collection" />
              <Tab label="History" value="history" />
            </Tabs>
          </Box>
        )}

        <Box>{renderTabContent()}</Box>
      </DialogContent>
    </Dialog>
  );
};

export default MoreDetailsModal;

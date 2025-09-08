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
import ContainerDetailsTab from "./tabs/containerDetails";

import { ItemData } from "../../util/types/itemTypes";
import { Ticket } from "../../util/types/ticketType";
import { ContainerData } from "../../util/types/containerType";

interface MoreDetailsModalPropsItem {
  isOpen: boolean;
  onClose: () => void;
  type: "item";
  data: ItemData;
  onUpdate?: (updatedItem: ItemData) => void;
  extraContent?: React.ReactNode;
}

interface MoreDetailsModalPropsTicket {
  isOpen: boolean;
  onClose: () => void;
  type: "ticket";
  data: Ticket;
  onUpdate?: (updatedItem: Ticket) => void;
  extraContent?: React.ReactNode;
}

interface MoreDetailsModalPropsContainer {
  isOpen: boolean;
  onClose: () => void;
  type: "container";
  data: ContainerData;
  onUpdate?: (updatedItem: ContainerData) => void;
  extraContent?: React.ReactNode;
}

type MoreDetailsModalProps =
  | MoreDetailsModalPropsItem
  | MoreDetailsModalPropsTicket
  | MoreDetailsModalPropsContainer;

const MoreDetailsModal = ({
  isOpen,
  onClose,
  data,
  type,
  onUpdate,
  extraContent,
}: MoreDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<
    "details" | "collection" | "history"
  >("details");
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
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
      setImageUrl((data as ItemData).imageUrl ?? undefined);
    } else {
      setImageUrl(undefined);
    }
  }, [data, type]);

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: string | number
  ) => {
    setActiveTab(newValue as "details" | "collection" | "history");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleUploadImage = async (file: File) => {
    if (!file || type !== "item") return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("itemID", (data as ItemData).itemID);

    setUploading(true);
    handleMenuClose();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/items/file/upload`,
        { method: "POST", body: formData }
      );
      const result = await res.json();
      setImageUrl(result.imageUrl);

      if (onUpdate)
        onUpdate({ ...(data as ItemData), imageUrl: result.imageUrl });

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
    const item = data as ItemData;
    if (!item?.itemID || !imageUrl) return;

    setUploading(true);
    handleMenuClose();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/items/file/delete/${item.itemID}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete request failed");

      setImageUrl(undefined);
      if (onUpdate) onUpdate({ ...(data as ItemData), imageUrl: undefined });
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
        if (type === "item") {
          return (
            <ItemDetailsTab
              data={data as ItemData}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              onUpdate={onUpdate}
            />
          );
        }
        if (type === "ticket")
          return <TicketDetailsTab data={data as Ticket} />;
        if (type === "container")
          return <ContainerDetailsTab data={data as ContainerData} />;
        return null;
      case "collection":
        return (
          <CollectionDetailsTab
            data={data as ItemData}
            onUpdate={onUpdate as ((item: ItemData) => void) | undefined}
          />
        );
      case "history":
        return <HistoryTab data={data} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {type === "item" && `Item ID: ${(data as ItemData).itemID}`}
        {type === "ticket" && `Ticket ID: ${(data as Ticket).ticketId}`}
        {type === "container" &&
          `Container ID: ${(data as ContainerData).containerID}`}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
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
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
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
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <label htmlFor="image-upload-input" style={{ width: "100%" }}>
                <MenuItem
                  disabled={uploading}
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

        {(type === "item" || type === "container") && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Details" value="details" />
              {type === "item" && (
                <Tab label="Collection Details" value="collection" />
              )}
              {type === "item" && <Tab label="History" value="history" />}
            </Tabs>
          </Box>
        )}

        <Box>{renderTabContent()}</Box>

        {extraContent && <Box mt={3}>{extraContent}</Box>}
      </DialogContent>
    </Dialog>
  );
};

export default MoreDetailsModal;

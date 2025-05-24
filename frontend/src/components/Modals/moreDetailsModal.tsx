import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ItemDetailsTab from "./tabs/itemDetails";
import TicketDetailsTab from "./tabs/ticketDetails";
import CollectionDetailsTab from "./tabs/collectionDetails";
import HistoryTab from "./tabs/historyDetails";

interface MoreDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  type: "item" | "ticket";
}

const MoreDetailsModal = ({
  isOpen,
  onClose,
  data,
  type,
}: MoreDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    setActiveTab("details");
  }, [type]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  if (!data) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return type === "item" ? (
          <ItemDetailsTab data={data} />
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
        {type === "item" ? `Item ID: ${data.itemID}` : "Details"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {data.imageUrl && (
          <Box sx={{ mb: 2, textAlign: "center" }}>
            <img
              src={data.imageUrl}
              alt="Item"
              style={{ maxHeight: 200, maxWidth: "100%" }}
            />
          </Box>
        )}

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

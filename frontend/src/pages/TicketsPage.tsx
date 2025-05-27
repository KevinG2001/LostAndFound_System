import { useState } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import useList from "../util/useList";
import TableView from "../components/Views/TableView";
import MoreDetailsModal from "../components/Modals/moreDetailsModal";
import TotalTickets from "../components/StatBubbles/tickets/TotalTickets";
import ClosedTickets from "../components/StatBubbles/tickets/ClosedTickets";
import OpenTickets from "../components/StatBubbles/tickets/OpenTickets";

function TicketsPage() {
  const { items: tickets } = useList("tickets", "list");
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRowClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const columns = [
    { header: "ID", accessor: "ticketId" },
    { header: "Description", accessor: "description" },
    { header: "Date Lost", accessor: "dateLost" },
    { header: "Date Created", accessor: "dateCreated" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "grey.100",
        pb: 2,
      }}
    >
      {/* Stat Bubbles */}
      <Box
        sx={{
          display: "flex",
          flexWrap: isSmDown ? "wrap" : "nowrap",
          gap: 2,
          mt: 1,
          mb: 2,
        }}
      >
        {[TotalTickets, ClosedTickets, OpenTickets].map((Component, i) => (
          <Box
            key={i}
            sx={{
              flex: "1 1 0",
              minWidth: 0,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: isSmDown ? "100%" : "auto",
            }}
          >
            <Component />
          </Box>
        ))}
      </Box>

      {/* Table */}
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <TableView
          columns={columns}
          data={tickets.length > 0 ? tickets : []}
          onRowClick={handleRowClick}
        />
      </Box>

      {/* Modal */}
      {selectedTicket && (
        <MoreDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          data={selectedTicket}
          type="ticket"
        />
      )}
    </Container>
  );
}

export default TicketsPage;

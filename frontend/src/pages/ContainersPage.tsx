import { Box, Container } from "@mui/material";
// Stat box imports
import ItemsToday from "../components/StatBubbles/ItemsToday";
import ItemsReturned from "../components/StatBubbles/ItemsReturned";
import LostThisMonth from "../components/StatBubbles/ItemsLostMonth";
import ItemsToCollectThisMonth from "../components/StatBubbles/ItemsToCollectThisMonth";
// Searchbar import
import useSearch from "../util/useSearch";
import Searchbar from "../components/Searchbar";
import TableView from "../components/Views/TableView";
import useList from "../util/useList";
import MoreDetailsModal from "../components/Modals/moreDetailsModal";
import { useState } from "react";
import { ContainerData } from "../util/types/containerType";

function Containers() {
  const { items: containersList } = useList("containers", "list");
  // Searchbar function
  const {
    searchTerm,
    setSearchTerm,
    searchDB,
    items: searchResults,
    hasSearched,
  } = useSearch();

  // Container Columns
  const columns = [
    { header: "ID", accessor: "containerID" },
    { header: "Date Created", accessor: "createdAt" },
    { header: "Amount of Items", accessor: "amountOfItems" },
  ];

  const [selectedContainer, setSelectedContainer] =
    useState<ContainerData | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (item: any) => {
    setSelectedContainer(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContainer(null);
  };

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
      {/* Stat boxes */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 1,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        {[
          ItemsToday,
          ItemsReturned,
          LostThisMonth,
          ItemsToCollectThisMonth,
        ].map((Component, i) => (
          <Box
            key={i}
            sx={{
              flex: "1 1 0",
              minWidth: 0,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
              p: 1.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Component />
          </Box>
        ))}
      </Box>
      {/* Searchbar */}
      <Box mb={2}>
        <Searchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchDB={searchDB}
        />
      </Box>
      {/* Containers */}
      <Box sx={{ flexGrow: 1 }}>
        <TableView
          columns={columns}
          data={containersList}
          onRowClick={handleRowClick}
        />
      </Box>
      {/* Modal */}
      {selectedContainer && (
        <MoreDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={selectedContainer}
          type="container"
        />
      )}
    </Container>
  );
}

export default Containers;

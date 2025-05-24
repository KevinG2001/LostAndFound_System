import { useEffect, useState } from "react";
import { Box, Container, useTheme } from "@mui/material";
import TableView from "../components/Views/TableView";
import useList from "../util/useList";
import MoreDetailsModal from "../components/Modals/moreDetailsModal";
import NewItemModal from "../components/Modals/newItemModal";
import { useLocation, useNavigate } from "react-router-dom";
import useSearch from "../util/useSearch";
import Searchbar from "../components/Searchbar";
import ItemsToday from "../components/StatBubbles/ItemsToday";
import ItemsReturned from "../components/StatBubbles/ItemsReturned";
import LostThisMonth from "../components/StatBubbles/ItemsLostMonth";
import ItemsToCollectThisMonth from "../components/StatBubbles/ItemsToCollectThisMonth";

function ItemsPage() {
  const { items: itemsList } = useList("items", "list");

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    searchDB,
    items: searchResults,
    hasSearched,
  } = useSearch();

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (location.state?.openNewItemModal) {
      setIsNewItemModalOpen(true);
      navigate("/items", { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const closeNewItemModal = () => setIsNewItemModalOpen(false);
  const handleCreateNewItem = () => closeNewItemModal();

  const columns = [
    { header: "ID", accessor: "itemID" },
    { header: "Article", accessor: "article" },
    { header: "Category", accessor: "category" },
    { header: "Type", accessor: "type" },
    { header: "Route", accessor: "route" },
    { header: "Garage", accessor: "garage" },
    { header: "Date Lost", accessor: "dateLost" },
    { header: "Status", accessor: "status" },
  ];

  const reversedItems = (items: any[]) => items.slice().reverse();

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

      <Box mb={2}>
        <Searchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchDB={searchDB}
        />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <TableView
          columns={columns}
          data={
            hasSearched
              ? reversedItems(searchResults)
              : reversedItems(itemsList)
          }
          onRowClick={handleRowClick}
        />
      </Box>

      {/* Modals */}
      {isNewItemModalOpen && (
        <NewItemModal
          onClose={closeNewItemModal}
          onCreate={handleCreateNewItem}
        />
      )}
      <MoreDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedItem}
        type="item"
      />
    </Container>
  );
}

export default ItemsPage;

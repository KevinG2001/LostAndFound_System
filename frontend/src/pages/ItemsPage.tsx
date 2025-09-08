import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
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
import { useItemSelection } from "../util/useItemSelection";
import { ItemData } from "../util/types/itemTypes";

function ItemsPage() {
  const { items: itemsList } = useList("items", "list");
  const { selectedItems, setSelectedItems } = useItemSelection();

  const [localItems, setLocalItems] = useState<ItemData[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
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

  useEffect(() => {
    setLocalItems(itemsList);
  }, [itemsList]);

  useEffect(() => {
    if (location.state?.openNewItemModal) {
      setIsNewItemModalOpen(true);
      navigate("/items", { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const handleRowClick = (item: ItemData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const closeNewItemModal = () => setIsNewItemModalOpen(false);
  const handleCreateNewItem = () => closeNewItemModal();

  const handleItemUpdate = (updatedItem: ItemData) => {
    setLocalItems((prev) =>
      prev.map((item) =>
        item.itemID === updatedItem.itemID ? updatedItem : item
      )
    );

    if (selectedItem?.itemID === updatedItem.itemID) {
      setSelectedItem(updatedItem);
    }
  };

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

  const reversedItems = (items: ItemData[]) => items.slice().reverse();

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
      <Box sx={{ display: "flex", gap: 2, mt: 1, mb: 2, flexWrap: "wrap" }}>
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

      {/* Search */}
      <Box mb={2}>
        <Searchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchDB={searchDB}
        />
      </Box>

      {/* Table */}
      <Box sx={{ flexGrow: 1 }}>
        <TableView
          columns={columns}
          data={
            hasSearched
              ? reversedItems(searchResults)
              : reversedItems(localItems)
          }
          onRowClick={handleRowClick}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </Box>

      {/* Modals */}
      {isNewItemModalOpen && (
        <NewItemModal
          onClose={closeNewItemModal}
          onCreate={handleCreateNewItem}
        />
      )}
      {isModalOpen && selectedItem && (
        <MoreDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          data={selectedItem}
          type="item"
          onUpdate={handleItemUpdate}
        />
      )}
    </Container>
  );
}

export default ItemsPage;

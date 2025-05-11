import { useEffect, useState } from "react";
import Styles from "../styles/pages/itemsPage.module.scss";
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

  const handleCreateNewItem = () => {
    closeNewItemModal();
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

  // Reverse the list of items (most recent first)
  const reversedItems = (items: any[]) => {
    return items.slice().reverse(); // Make sure to create a copy of the array before reversing
  };

  return (
    <div className={Styles.itemsContainer}>
      <div className={Styles.statsContainer}>
        <div className={`${Styles.statsWrapper} ${Styles.itemsLost}`}>
          <ItemsToday />
        </div>
        <div className={`${Styles.statsWrapper} ${Styles.itemsReturned}`}>
          <ItemsReturned />
        </div>
        <div className={`${Styles.statsWrapper} ${Styles.itemsExpired}`}>
          <LostThisMonth />
        </div>
        <div className={Styles.statsWrapper}>
          <ItemsToCollectThisMonth />
        </div>
      </div>

      <Searchbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchDB={searchDB}
      />

      <div className={Styles.itemTable}>
        <TableView
          columns={columns}
          data={
            hasSearched
              ? reversedItems(searchResults)
              : reversedItems(itemsList)
          }
          onRowClick={handleRowClick}
        />
      </div>

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
    </div>
  );
}

export default ItemsPage;

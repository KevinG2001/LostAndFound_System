import { useEffect, useState } from "react";
import Styles from "../styles/pages/itemsPage.module.scss";
import TableView from "../components/Views/TableView";
import useList from "../util/useList";
import MoreDetailsModal from "../components/Modals/moreDetailsModal";
import NewItemModal from "../components/Modals/newItem";
import { useLocation, useNavigate } from "react-router-dom";
import useSearch from "../util/useSearch";
import Searchbar from "../components/Searchbar";
import ItemsToday from "../components/StatBubbles/ItemsToday";
import ItemsReturned from "../components/StatBubbles/ItemsReturned";
import LostThisMonth from "../components/StatBubbles/ItemsLostMonth";

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
    { header: "Description", accessor: "description" },
    { header: "Category", accessor: "category" },
    { header: "Type", accessor: "type" },
    { header: "Route", accessor: "route" },
    { header: "Garage", accessor: "garage" },
    { header: "Date Lost", accessor: "dateLost" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className={Styles.itemsContainer}>
      <div className={Styles.statsWrapper}>
        <div className={`${Styles.statBubble} ${Styles.itemsLost}`}>
          <ItemsToday />
        </div>
        <div className={`${Styles.statBubble} ${Styles.itemsReturned}`}>
          <ItemsReturned />
        </div>
        <div className={`${Styles.statBubble} ${Styles.itemsExpired}`}>
          <LostThisMonth />
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
          data={hasSearched ? searchResults : itemsList}
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

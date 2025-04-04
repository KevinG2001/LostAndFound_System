import { useEffect, useState } from "react";
import useCount from "../util/useCount";
import Styles from "../styles/pages/itemsPage.module.scss";
import TableView from "../components/Views/TableView";
import useList from "../util/useList";
import MoreDetailsModal from "../components/Modals/moreDetails";
import NewItemModal from "../components/Modals/newItem";
import { useLocation, useNavigate } from "react-router-dom";

function ItemsPage() {
  const { counts } = useCount("items");
  const { items: itemsList } = useList("items", "list");

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [items, setItems] = useState(itemsList);

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

  const openNewItemModal = () => setIsNewItemModalOpen(true);
  const closeNewItemModal = () => setIsNewItemModalOpen(false);

  const handleCreateNewItem = (newItem: any) => {
    setItems([...items, newItem]);
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
          Total Items Lost <br />
          {counts?.totalCount !== undefined ? counts.totalCount : "Loading..."}
        </div>
        <div className={`${Styles.statBubble} ${Styles.itemsReturned}`}>
          Items Returned <br />
          {counts?.returnedCount !== undefined
            ? counts.returnedCount
            : "Loading..."}
        </div>
        <div className={`${Styles.statBubble} ${Styles.itemsExpired}`}>
          Lost This Month <br />
          {counts?.lostItemCount !== undefined
            ? counts.lostItemCount
            : "Loading..."}
        </div>
      </div>

      {/* <button className={Styles.newItemButton} onClick={openNewItemModal}>
        New Item
      </button> */}

      <div className={Styles.itemTable}>
        <TableView
          columns={columns}
          data={itemsList}
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

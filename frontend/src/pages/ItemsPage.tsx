import { useState } from "react";
import useCount from "../util/useCount";
import Styles from "../styles/pages/itemsPage.module.scss";
import TableView from "../components/Views/TableView";
import useList from "../util/useList";
import MoreDetailsModal from "../components/Modals/moreDetails";

function ItemsPage() {
  const { counts } = useCount("items");

  const { items: itemsList } = useList("items", "list");

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
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
        <div className={Styles.statBubble}>
          Total Items Lost <br />
          {counts?.totalCount !== undefined ? counts.totalCount : "Loading..."}
        </div>
        <div className={Styles.statBubble}>
          Items Returned <br />
          {counts?.returnedCount !== undefined
            ? counts.returnedCount
            : "Loading..."}
        </div>
        <div className={Styles.statBubble}>
          Lost Items <br />
          {counts?.lostItemCount !== undefined
            ? counts.lostItemCount
            : "Loading..."}
        </div>
      </div>

      <div className={Styles.itemTable}>
        <TableView
          columns={columns}
          data={itemsList.length > 0 ? itemsList : []}
          onRowClick={handleRowClick}
        />
      </div>

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

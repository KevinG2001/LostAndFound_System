import Styles from "../styles/pages/itemsPage.module.scss";
import TableView from "../components/Views/TableView";
import useItemCount from "../util/useItemCount";
import useItemList from "../util/useItemList";
import Searchbar from "../components/Searchbar";
import { useState } from "react";
import CreateItem from "../components/Forms/CreateItem";

function Items() {
  const [isNewItemOpen, setIsNewItemOpen] = useState(false);

  const { itemCounts } = useItemCount("count");
  const { items } = useItemList("list");

  const toggleModal = () => {
    setIsNewItemOpen((prevState) => !prevState);
  };

  //Columns pased into the TableView
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
    <>
      <div className={Styles.itemsContainer}>
        <div className={Styles.statsWrapper}>
          <div className={Styles.statBubble}>
            Total Items Lost <br />
            {itemCounts && itemCounts.itemCount !== undefined
              ? itemCounts.itemCount
              : "Loading..."}
          </div>
          <div className={Styles.statBubble}>
            Items Returned <br />
            {itemCounts && itemCounts.returnedCount !== undefined
              ? itemCounts.returnedCount
              : "Loading..."}
          </div>
          <div className={Styles.statBubble}>
            Lost Items
            <br />
            {itemCounts && itemCounts.lostItemCount !== undefined
              ? itemCounts.lostItemCount
              : "Loading..."}
          </div>
          <div className={Styles.statBubble}>Item Expired</div>
        </div>
        <div className={Styles.searchBar_NewItemBtn}>
          <Searchbar />
          <button onClick={toggleModal}>New Item</button>
        </div>
        <div className={Styles.itemTable}>
          <TableView columns={columns} data={items} />
        </div>
      </div>
      <CreateItem show={isNewItemOpen} onClose={toggleModal} />
    </>
  );
}

export default Items;

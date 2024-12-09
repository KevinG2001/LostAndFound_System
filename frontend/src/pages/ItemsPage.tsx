import { useState } from "react";
import useCount from "../util/useCount"; // Use the generalized hook
import Styles from "../styles/pages/itemsPage.module.scss";
import TableView from "../components/Views/TableView";
import Searchbar from "../components/Searchbar";
import useList from "../util/useList";

function ItemsPage() {
  const [isNewItemOpen, setIsNewItemOpen] = useState(false);
  const { counts, loading } = useCount("items");

  const { items: itemsList } = useList("items", "list");

  // const {
  //   searchTerm,
  //   setSearchTerm,
  //   searchDB,
  //   items: searchResults,
  // } = useSearch();

  const toggleModal = () => {
    setIsNewItemOpen((prevState) => !prevState);
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
      <div className={Styles.searchBar_NewItemBtn}>
        {/* <Searchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchDB={searchDB}
        /> */}
        <button onClick={toggleModal}>New Item</button>
      </div>
      <div className={Styles.itemTable}>
        <TableView
          columns={columns}
          data={itemsList.length > 0 ? itemsList : []} // Pass the fetched items data
        />
      </div>
    </div>
  );
}

export default ItemsPage;

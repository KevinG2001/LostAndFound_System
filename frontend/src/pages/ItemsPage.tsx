import { useState } from "react";
import Styles from "../styles/pages/itemsPage.module.scss";
import TableView from "../components/Views/TableView";
import useItemCount from "../util/useItemCount";
import useItemList from "../util/useItemList";
import Searchbar from "../components/Searchbar";
import CreateItem from "../components/Forms/CreateItem";
import useSearch from "../util/useSearch"; // Assuming you have the useSearch hook

function Items() {
  const [isNewItemOpen, setIsNewItemOpen] = useState(false);
  const { itemCounts } = useItemCount("count");
  const { items } = useItemList("list");
  const {
    searchTerm,
    setSearchTerm,
    searchDB,
    items: searchResults,
    loading,
  } = useSearch();

  const toggleModal = () => {
    setIsNewItemOpen((prevState) => !prevState);
  };

  //Columns passed into the TableView
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
          {/* Pass search-related props to Searchbar */}
          <Searchbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchDB={searchDB}
            loading={loading}
          />
          <button onClick={toggleModal}>New Item</button>
        </div>
        <div className={Styles.itemTable}>
          {/* Show search results if available, else show default items */}
          <TableView
            columns={columns}
            data={searchResults.length > 0 ? searchResults : items}
          />
        </div>
      </div>
      <CreateItem show={isNewItemOpen} onClose={toggleModal} />
    </>
  );
}

export default Items;

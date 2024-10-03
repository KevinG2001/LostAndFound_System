import { useEffect, useState } from "react";
import Styles from "../styles/pages/itemsPage.module.scss";
import TableView from "../components/Views/TableView";
import useItemCount from "../util/useItemCount";

function Items() {
  const [items, setItems] = useState([]);
  const { itemCounts } = useItemCount("count"); // Assuming itemCounts is an object
  console.log(itemCounts);

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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:4000/items/list");
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <div className={Styles.itemsContainer}>
        <div className={Styles.statsWrapper}>
          <div className={Styles.statBubble}>
            Total Items Lost <br />
            {/* Make sure you access the individual values and not the object */}
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
        <div className={Styles.itemTable}>
          <TableView columns={columns} data={items} />
        </div>
      </div>
    </>
  );
}

export default Items;

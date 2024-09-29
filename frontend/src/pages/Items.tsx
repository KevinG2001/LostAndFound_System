import Styles from "../styles/pages/itemsPage.module.scss";

function Items() {
  return (
    <>
      <div className={Styles.itemsContainer}>
        <div className={Styles.statsWrapper}>
          <div className={Styles.statBubble}>Items Lost</div>
          <div className={Styles.statBubble}>Items Returned</div>
          <div className={Styles.statBubble}>Items Expiring</div>
          <div className={Styles.statBubble}>Last stat</div>
        </div>
        <div className={Styles.itemTable}>
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Group</th>
              <th>Brand</th>
              <th>Route</th>
              <th>Garage</th>
            </tr>
            <tr>
              <th>1</th>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Items;

import useCount from "../../util/useCount";
import Styles from "../../styles/stats/bubbleStat.module.scss";
import ReturnIcon from "../../assets/returnIcon.svg?react";

function ItemsReturned() {
  const { counts } = useCount("items");

  return (
    <div className={`${Styles.statBubble} ${Styles.itemsReturned}`}>
      <ReturnIcon className={`${Styles.bubbleIcon} ${Styles.returned}`} />
      <div className={Styles.statDescription}>
        <div className={Styles.statTitle}>Items Returned</div>
        <div className={Styles.statValue}>
          {counts?.returnedCount !== undefined
            ? counts.returnedCount
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default ItemsReturned;

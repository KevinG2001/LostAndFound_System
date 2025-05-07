import Styles from "../../styles/stats/bubbleStat.module.scss";
import useCount from "../../util/useCount";
import ItemIcon from "../../assets/itemIcon.svg?react";

function TotalCount() {
  const { counts } = useCount("items");

  return (
    <div className={Styles.statBubble}>
      <ItemIcon className={Styles.bubbleIcon} />
      <div className={Styles.statDescription}>
        <div className={Styles.statTitle}>Total Items Lost</div>
        <div className={Styles.statValue}>
          {counts?.totalCount !== undefined ? counts.totalCount : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default TotalCount;

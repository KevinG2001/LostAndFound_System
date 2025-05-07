import Styles from "../../styles/stats/bubbleStat.module.scss";
import useCount from "../../util/useCount";
import ReturnIcon from "../../assets/returnIcon.svg?react";

function ReturnPercent() {
  const { counts } = useCount("items");

  const total = counts?.totalCount ?? 0;
  const returned = counts?.returnedCount ?? 0;
  const returnPercentage =
    total > 0 ? ((returned / total) * 100).toFixed(1) : "0";

  return (
    <div className={Styles.statBubble}>
      <ReturnIcon className={Styles.bubbleIcon} />
      <div className={Styles.statDescription}>
        <div className={Styles.statTitle}>Return Rate</div>
        <div className={Styles.statValue}>
          {total > 0 ? `${returnPercentage}%` : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default ReturnPercent;

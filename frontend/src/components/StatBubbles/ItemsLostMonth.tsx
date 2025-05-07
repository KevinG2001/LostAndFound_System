import useCount from "../../util/useCount";
import Styles from "../../styles/stats/bubbleStat.module.scss";
import CalendarIcon from "../../assets/calenderIcon.svg?react";

function LostThisMonth() {
  const { counts } = useCount("items");

  return (
    <div className={`${Styles.statBubble} ${Styles.itemsExpired}`}>
      <CalendarIcon className={`${Styles.bubbleIcon} ${Styles.lost}`} />
      <div className={Styles.statDescription}>
        <div className={Styles.statTitle}>Lost This Month</div>
        <div className={Styles.statValue}>
          {counts?.lostItemCount !== undefined
            ? counts.lostItemCount
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default LostThisMonth;

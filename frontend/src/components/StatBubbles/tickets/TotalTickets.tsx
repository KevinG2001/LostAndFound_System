import useCount from "../../../util/useCount";
import Styles from "../../../styles/stats/bubbleStat.module.scss";
import TotalTicketIcon from "../../../assets/Tickets/ticketIcon.svg?react";

function TotalTickets() {
  const { counts } = useCount("tickets");

  return (
    <div className={`${Styles.statBubble} ${Styles.itemsLost}`}>
      <TotalTicketIcon className={`${Styles.bubbleIcon} ${Styles.total}`} />
      <div className={Styles.statDescription}>
        <div className={Styles.statTitle}>Total Tickets</div>
        <div className={Styles.statValue}>
          {counts?.totalCount !== undefined ? counts.totalCount : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default TotalTickets;

import useCount from "../../../util/useCount";
import Styles from "../../../styles/stats/bubbleStat.module.scss";
import ClosedTicketIcon from "../../../assets/Tickets/closedTicketIcon.svg?react";

function ClosedTickets() {
  const { counts } = useCount("tickets");

  return (
    <div className={`${Styles.statBubble} ${Styles.itemsReturned}`}>
      <ClosedTicketIcon className={`${Styles.bubbleIcon} ${Styles.closed}`} />
      <div className={Styles.statDescription}>
        <div className={Styles.statTitle}>Closed Tickets</div>
        <div className={Styles.statValue}>
          {counts?.closedTicketCount !== undefined
            ? counts.closedTicketCount
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default ClosedTickets;

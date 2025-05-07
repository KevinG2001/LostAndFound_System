import useCount from "../../../util/useCount";
import Styles from "../../../styles/stats/bubbleStat.module.scss";
import OpenTicketIcon from "../../../assets/Tickets/openTicketIcon.svg?react";

function OpenTickets() {
  const { counts } = useCount("tickets");

  return (
    <div className={`${Styles.statBubble} ${Styles.itemsExpired}`}>
      <OpenTicketIcon className={`${Styles.bubbleIcon} ${Styles.open}`} />

      <div className={Styles.statDescription}>
        <div className={Styles.statTitle}>Open Tickets</div>
        <div className={Styles.statValue}>
          {counts?.openTicketCount !== undefined
            ? counts.openTicketCount
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default OpenTickets;

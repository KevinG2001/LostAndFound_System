import React from "react";
import Styles from "../../../styles/modals/moreDetails.module.scss";
import TicketChat from "../../TicketChat";

const TicketDetailsTab = ({ data }: { data: any }) => (
  <div className={Styles.detailsContainer}>
    <h2 className={Styles.detailsTitle}>Ticket Details</h2>
    <div className={Styles.detailsRow}>
      <span className={Styles.detailLabel}>Ticket ID:</span>
      <span className={Styles.detailValue}>{data.ticketId}</span>
      <span className={Styles.detailLabel}>Ticket Status:</span>
      <span className={Styles.detailValue}>{data.status}</span>
    </div>
    <div className={Styles.detailsRow}>
      <span className={Styles.detailLabel}>Date Lost:</span>
      <span className={Styles.detailValue}>{data.dateLost}</span>
      <span className={Styles.detailLabel}>Date Created:</span>
      <span className={Styles.detailValue}>{data.dateCreated}</span>
    </div>
    <div className={Styles.chatContainer}>
      <TicketChat ticketId={data.ticketId} description={data.description} />
    </div>
  </div>
);

export default TicketDetailsTab;

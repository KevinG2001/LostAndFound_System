import React from "react";
import Styles from "../../../styles/modals/moreDetails.module.scss";
import TicketChat from "../../TicketChat";

const TicketDetailsTab = ({ data }: { data: any }) => (
  <div className={Styles.detailsContainer}>
    <h2 className={Styles.detailsTitle}>Ticket Details</h2>

    <div className={Styles.detailsRow}>
      <div className={Styles.flexItem}>
        <div className={Styles.detailLabel}>Ticket ID:</div>
        <div className={Styles.detailValue}>{data.ticketId}</div>
      </div>
      <div className={Styles.flexItem}>
        <div className={Styles.detailLabel}>Ticket Status:</div>
        <div className={Styles.detailValue}>{data.status}</div>
      </div>
    </div>

    <div className={Styles.detailsRow}>
      <div className={Styles.flexItem}>
        <div className={Styles.detailLabel}>Date Lost:</div>
        <div className={Styles.detailValue}>{data.dateLost}</div>
      </div>
      <div className={Styles.flexItem}>
        <div className={Styles.detailLabel}>Date Created:</div>
        <div className={Styles.detailValue}>{data.dateCreated}</div>
      </div>
    </div>

    <div className={Styles.chatWrapper}>
      <TicketChat ticketId={data.ticketId} description={data.description} />
    </div>
  </div>
);

export default TicketDetailsTab;

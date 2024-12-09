import { useState, useEffect } from "react";
import useCount from "../util/useCount";
import Styles from "../styles/pages/itemsPage.module.scss";
import TableView from "../components/Views/TableView";
import useList from "../util/useList";

function TicketsPage() {
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const { counts } = useCount("tickets"); // Fetch counts for tickets

  const { items: tickets } = useList("tickets", "list");

  const toggleModal = () => {
    setIsNewTicketOpen((prevState) => !prevState);
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Type", accessor: "type" },
    { header: "Brand", accessor: "brand" },
    { header: "Colour", accessor: "colour" },
    { header: "Date Lost", accessor: "datelost" },
    { header: "Date Created", accessor: "datecreated" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className={Styles.itemsContainer}>
      <div className={Styles.statsWrapper}>
        <div className={Styles.statBubble}>
          Total Tickets <br />
          {counts?.ticketCount !== undefined
            ? counts.ticketCount
            : "Loading..."}
        </div>
        <div className={Styles.statBubble}>
          Open Tickets <br />
          {counts?.openTicketCount !== undefined
            ? counts.openTicketCount
            : "Loading..."}
        </div>
        <div className={Styles.statBubble}>
          Closed Tickets <br />
          {counts?.closedTicketCount !== undefined
            ? counts.closedTicketCount
            : "Loading..."}
        </div>
      </div>
      <div className={Styles.itemTable}>
        <TableView
          columns={columns}
          data={tickets.length > 0 ? tickets : []} // Pass the fetched tickets data
        />
      </div>
    </div>
  );
}

export default TicketsPage;

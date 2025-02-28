import { useState } from "react";
import useCount from "../util/useCount";
import Styles from "../styles/pages/itemsPage.module.scss";
import TableView from "../components/Views/TableView";
import useList from "../util/useList";
import MoreDetailsModal from "../components/Modals/moreDetails";

function TicketsPage() {
  const { counts } = useCount("tickets");

  const { items: tickets } = useList("tickets", "list");

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const columns = [
    { header: "ID", accessor: "ticketId" },
    { header: "Description", accessor: "description" },
    { header: "Date Lost", accessor: "dateLost" },
    { header: "Date Created", accessor: "dateCreated" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className={Styles.itemsContainer}>
      <div className={Styles.statsWrapper}>
        <div className={`${Styles.statBubble} ${Styles.itemsLost}`}>
          Total Tickets <br />
          {counts?.totalCount !== undefined ? counts.totalCount : "Loading..."}
        </div>
        <div className={`${Styles.statBubble} ${Styles.itemsReturned}`}>
          Closed Tickets <br />
          {counts?.closedTicketCount !== undefined
            ? counts.closedTicketCount
            : "Loading..."}
        </div>
        <div className={`${Styles.statBubble} ${Styles.itemsExpired}`}>
          Open Tickets <br />
          {counts?.openTicketCount !== undefined
            ? counts.openTicketCount
            : "Loading..."}
        </div>
      </div>

      <div className={Styles.itemTable}>
        <TableView
          columns={columns}
          data={tickets.length > 0 ? tickets : []}
          onRowClick={handleRowClick}
        />
      </div>

      <MoreDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedTicket}
        type="ticket"
      />
    </div>
  );
}

export default TicketsPage;

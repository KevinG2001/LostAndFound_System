import { useState } from "react";
import useList from "../util/useList";
import Styles from "../styles/pages/itemsPage.module.scss";
import TableView from "../components/Views/TableView";
import MoreDetailsModal from "../components/Modals/moreDetailsModal";
import TotalTickets from "../components/StatBubbles/tickets/TotalTickets";
import ClosedTickets from "../components/StatBubbles/tickets/ClosedTickets";
import OpenTickets from "../components/StatBubbles/tickets/OpenTickets";

function TicketsPage() {
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
      <div className={Styles.statsContainer}>
        <div className={Styles.statsWrapper}>
          <TotalTickets />
        </div>
        <div className={Styles.statsWrapper}>
          <ClosedTickets />
        </div>
        <div className={Styles.statsWrapper}>
          <OpenTickets />
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

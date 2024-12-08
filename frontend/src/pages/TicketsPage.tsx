import TableView from "../components/Views/TableView";
import Styles from "../styles/pages/itemsPage.module.scss";
import useTicketList from "../util/useTicketList";

function TicketsPage() {
  const { tickets } = useTicketList("list");

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Type", accessor: "type" },
    { header: "Brand", accessor: "brand" },
    { header: "Color", accessor: "colour" },
    { header: "Date Lost", accessor: "date_lost" },
    { header: "Date Created", accessor: "created_at" },
    { header: "Status", accessor: "status" },
  ];
  return (
    <>
      <div className={Styles.itemsContainer}>
        <div className={Styles.itemTable}>
          <TableView columns={columns} data={tickets} />
        </div>
      </div>
    </>
  );
}

export default TicketsPage;

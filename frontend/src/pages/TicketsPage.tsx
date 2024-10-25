import TableView from "../components/Views/TableView";
import Styles from "../styles/views/tableView.module.scss";
import useTicketList from "../util/useTicketList";

function Tickets() {
  const { tickets } = useTicketList("list");

  const columns = [
    { header: "ID", accessor: "_id" },
    { header: "Type", accessor: "type" },
    { header: "Brand", accessor: "brand" },
    { header: "Color", accessor: "color" },
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

export default Tickets;

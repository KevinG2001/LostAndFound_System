import { useState } from "react";
import Style from "../../styles/views/tableView.module.scss";

interface TableViewProps {
  columns: { header: string; accessor: string }[];
  data: any[];
  onRowClick?: (item: any) => void;
}

const TableView = ({ columns, data, onRowClick }: TableViewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Empty row for styling
  const emptyRows = Array.from(
    { length: rowsPerPage - paginatedData.length },
    () => ({})
  );

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const statusMapping = {
    Claimed: Style.claimedStatus,
    Unclaimed: Style.unclaimedStatus,
    Expired: Style.expiredStatus,
    "To Collect": Style.tocollectStatus,
    Open: Style.openStatus,
    Closed: Style.closedStatus,
  };

  return (
    <div className={Style.container}>
      <table className={Style.tableContainer}>
        <thead className={Style.tableHeader}>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className={Style.tableBody}>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={Style.tableRow}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col, colIndex) => {
                const cellData = row[col.accessor] || "";
                const statusClass =
                  col.accessor === "status"
                    ? statusMapping[cellData] || ""
                    : "";

                return (
                  <td key={colIndex} className={Style.tableCell}>
                    {col.accessor === "status" ? (
                      <span className={`${Style.statusBubble} ${statusClass}`}>
                        {cellData}
                      </span>
                    ) : (
                      cellData
                    )}
                  </td>
                );
              })}
            </tr>
          ))}

          {/* Filling empty space with empty rows to keep clean look */}
          {emptyRows.map((_, index) => (
            <tr key={`empty-${index}`} className={Style.tableRow}>
              {columns.map((_, colIndex) => (
                <td key={colIndex}>&nbsp;</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={Style.pageBtnWrapper}>
        <button
          className={Style.pageBtn}
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`${Style.pageBtn} ${
              currentPage === index + 1 ? Style.activePage : ""
            }`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={Style.pageBtn}
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableView;

import { useState } from "react";
import Style from "../../styles/views/tableView.module.scss";

const TableView = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  //Creating empty rows to keep the table clean
  const emptyRows = Array.from(
    { length: rowsPerPage - paginatedData.length },
    () => ({})
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            <tr key={rowIndex} className={Style.tableRow}>
              {columns.map((col, colIndex) => {
                const cellData = row[col.accessor] || "";
                let statusClass = "";

                if (col.accessor === "status") {
                  if (cellData === "Returned") {
                    statusClass = Style.returnedStatus;
                  } else if (cellData === "Lost") {
                    statusClass = Style.lostStatus;
                  } else if (cellData === "Expired") {
                    statusClass = Style.expiredStatus;
                  } else if (cellData === "To Collect") {
                    statusClass = Style.tocollect;
                  }
                }

                return (
                  <td key={colIndex} className={statusClass}>
                    {cellData}
                  </td>
                );
              })}
            </tr>
          ))}

          {/* Filling empty space with empty rows to keep clean look */}
          {/* Will fix later on to just not fill the space but the look will be the same */}
          {emptyRows.map((_, index) => (
            <tr key={`empty-${index}`} className={Style.tableRow}>
              {columns.map((_, colIndex) => (
                <td key={colIndex}>&nbsp;</td> // Add an empty space (&nbsp;) to preserve cell structure
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

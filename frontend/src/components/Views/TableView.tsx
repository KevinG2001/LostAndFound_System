import Style from "../../styles/views/tableView.module.scss";

let TableView = ({ columns, data }) => {
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
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={Style.tableRow}>
              {columns.map((col, colIndex) => {
                // Change the colour of the box in status depending on whats in it (Lost, Returned etc..)
                //Change colours in tableViewmodule
                const status = row[col.accessor];
                let statusClass = "";

                if (col.accessor === "status") {
                  if (status === "Returned") {
                    statusClass = Style.returnedStatus;
                  } else if (status === "Lost") {
                    statusClass = Style.lostStatus;
                  } else if (status === "Expired") {
                    statusClass = Style.emailSentStatus;
                  }
                }

                return (
                  <td key={colIndex} className={statusClass}>
                    {status}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={Style.pageBtnWrapper}>
        <div className={Style.pageBtn}>1</div>
        <div className={Style.pageBtn}>2</div>
        <div className={Style.pageBtn}>3</div>
      </div>
    </div>
  );
};

export default TableView;

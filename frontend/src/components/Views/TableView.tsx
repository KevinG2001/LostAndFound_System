import Style from "../../styles/views/tableView.module.scss";

//Columns and data recived by Items.tsx
let TableView = ({ columns, data }) => {
  return (
    <>
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
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col.accessor]}</td>
                ))}
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
    </>
  );
};

export default TableView;

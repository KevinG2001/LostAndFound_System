import React, { useState } from "react";
import Styles from "../../../styles/modals/moreDetails.module.scss";

function HistoryDetails({ data }: { data: any }) {
  const history = data?.historyDetails || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const sortedHistory = [...history].sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={Styles.detailsContainer}>
      {sortedHistory.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <div className={Styles.historyTable}>
          <div className={`${Styles.row} ${Styles.headerRow}`}>
            <div className={Styles.cell}>Date</div>
            <div className={Styles.cell}>Action</div>
            <div className={Styles.cell}>By</div>
          </div>

          {sortedHistory.map((entry: any, index: number) => (
            <React.Fragment key={index}>
              <div className={Styles.row} onClick={() => toggleExpand(index)}>
                <div className={Styles.cell}>
                  {new Date(entry.date).toLocaleString()}
                </div>
                <div className={Styles.cell}>{entry.action}</div>
                <div className={Styles.cell}>{entry.by || "System"}</div>
              </div>

              {expandedIndex === index && entry.changes && (
                <div className={`${Styles.row} ${Styles.expandedRow}`}>
                  <div className={Styles.cell}>
                    <div className={Styles.changesHeader}>From:</div>
                    {entry.action === "Created"
                      ? Object.entries(entry.changes).map(
                          ([field, value]: [string, any], i) => (
                            <div key={i} className={Styles.changeLine}>
                              <div className={Styles.fieldName}>{field}:</div>
                              <div className={Styles.valueText}>
                                {value.to?.toString() || "N/A"}
                              </div>
                            </div>
                          )
                        )
                      : Object.entries(entry.changes).map(
                          ([field, value]: [string, any], i) => (
                            <div key={i} className={Styles.changeLine}>
                              <div className={Styles.fieldName}>{field}:</div>
                              <div className={Styles.valueText}>
                                {value.from?.toString() || "N/A"}
                              </div>
                            </div>
                          )
                        )}
                  </div>
                  <div className={Styles.cell}>
                    <div className={Styles.changesHeader}>To:</div>
                    {entry.action === "Created"
                      ? Object.entries(entry.changes).map(
                          ([field, value]: [string, any], i) => (
                            <div key={i} className={Styles.changeLine}>
                              <div className={Styles.fieldName}>{field}:</div>
                              <div className={Styles.valueText}>
                                {value.to?.toString() || "N/A"}
                              </div>
                            </div>
                          )
                        )
                      : Object.entries(entry.changes).map(
                          ([field, value]: [string, any], i) => (
                            <div key={i} className={Styles.changeLine}>
                              <div className={Styles.fieldName}>{field}:</div>
                              <div className={Styles.valueText}>
                                {value.to?.toString() || "N/A"}
                              </div>
                            </div>
                          )
                        )}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryDetails;

import React, { useState, useEffect } from "react";
import Styles from "../../../styles/modals/moreDetails.module.scss";
import TicketChat from "../../TicketChat";
import useEdit from "../../../util/useEdit";

const TicketDetailsTab = ({ data }: { data: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(data.status || "");
  const { loading, editItem } = useEdit(data?.ticketId, "ticket");

  useEffect(() => {
    setEditedStatus(data.status || "");
  }, [data]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedStatus(e.target.value);
  };

  const handleSave = async () => {
    try {
      await editItem({ ...data, status: editedStatus });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className={Styles.detailsContainer}>
      <h2 className={Styles.detailsTitle}>Ticket Details</h2>

      <div className={Styles.detailsRow}>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Ticket ID:</div>
          <div className={Styles.detailValue}>{data.ticketId}</div>
        </div>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Ticket Status:</div>
          {isEditing ? (
            <select
              name="status"
              value={editedStatus}
              onChange={handleStatusChange}
              className={Styles.selectField}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          ) : (
            <div className={Styles.detailValue}>{data.status}</div>
          )}
        </div>
      </div>

      <div className={Styles.detailsRow}>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Date Lost:</div>
          <div className={Styles.detailValue}>{data.dateLost}</div>
        </div>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Date Created:</div>
          <div className={Styles.detailValue}>{data.dateCreated}</div>
        </div>
      </div>

      {isEditing && (
        <div className={Styles.editActions}>
          <button
            onClick={handleSave}
            disabled={loading}
            className={Styles.saveBtn}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className={Styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      )}

      {!isEditing && (
        <div className={Styles.editActions}>
          <button onClick={() => setIsEditing(true)} className={Styles.editBtn}>
            Edit
          </button>
        </div>
      )}

      <div className={Styles.chatWrapper}>
        <TicketChat ticketId={data.ticketId} description={data.description} />
      </div>
    </div>
  );
};

export default TicketDetailsTab;

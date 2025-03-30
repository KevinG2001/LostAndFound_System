import React, { useState } from "react";
import Styles from "../../styles/modals/moreDetails.module.scss";
import TicketChat from "../TicketChat";
import useEdit from "../../util/useEdit";

interface MoreDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  type: "item" | "ticket";
}

const MoreDetailsModal = ({
  isOpen,
  onClose,
  data,
  type,
}: MoreDetailsModalProps) => {
  if (!data) {
    return null;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    itemID: data?.itemID || "",
    description: data?.description || "",
    category: data?.category || "",
    type: data?.type || "",
    route: data?.route || "",
    garage: data?.garage || "",
    dateLost: data?.dateLost || "",
    status: data?.status || "",
  });

  const { loading, error, success, editItem } = useEdit(data?.itemID);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await editItem(editedData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  if (!isOpen) return null;

  const renderContent = () => {
    if (type === "item") {
      return (
        <div className={Styles.detailsContainer}>
          <h2 className={Styles.detailsTitle}>Item Details</h2>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>ID:</span>
            {isEditing ? (
              <input
                type="text"
                name="itemID"
                value={editedData.itemID}
                onChange={handleInputChange}
              />
            ) : (
              <span className={Styles.detailValue}>{editedData.itemID}</span>
            )}
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Description:</span>
            {isEditing ? (
              <input
                type="text"
                name="description"
                value={editedData.description}
                onChange={handleInputChange}
              />
            ) : (
              <span className={Styles.detailValue}>
                {editedData.description}
              </span>
            )}
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Category:</span>
            {isEditing ? (
              <input
                type="text"
                name="category"
                value={editedData.category}
                onChange={handleInputChange}
              />
            ) : (
              <span className={Styles.detailValue}>{editedData.category}</span>
            )}
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Type:</span>
            {isEditing ? (
              <input
                type="text"
                name="type"
                value={editedData.type}
                onChange={handleInputChange}
              />
            ) : (
              <span className={Styles.detailValue}>{editedData.type}</span>
            )}
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Route:</span>
            {isEditing ? (
              <input
                type="text"
                name="route"
                value={editedData.route}
                onChange={handleInputChange}
              />
            ) : (
              <span className={Styles.detailValue}>{editedData.route}</span>
            )}
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Garage:</span>
            {isEditing ? (
              <input
                type="text"
                name="garage"
                value={editedData.garage}
                onChange={handleInputChange}
              />
            ) : (
              <span className={Styles.detailValue}>{editedData.garage}</span>
            )}
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Date Lost:</span>
            {isEditing ? (
              <input
                type="text"
                name="dateLost"
                value={editedData.dateLost}
                onChange={handleInputChange}
              />
            ) : (
              <span className={Styles.detailValue}>{editedData.dateLost}</span>
            )}
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Status:</span>
            {isEditing ? (
              <select
                name="status"
                value={editedData.status}
                onChange={handleInputChange}
              >
                <option value="Claimed">Claimed</option>
                <option value="Unclaimed">Unclaimed</option>
                <option value="Expired">Expired</option>
                <option value="To Collect">To Collect</option>
              </select>
            ) : (
              <span className={Styles.detailValue}>{editedData.status}</span>
            )}
          </div>
          <div>
            {isEditing ? (
              <button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            ) : (
              <button onClick={handleEditClick}>Edit</button>
            )}
            {error && <div className="error">{error}</div>}
            {success && <div className="success">Item saved successfully!</div>}
          </div>
        </div>
      );
    } else if (type === "ticket") {
      return (
        <div className={Styles.detailsContainer}>
          <h2 className={Styles.detailsTitle}>Ticket Details</h2>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Ticket ID:</span>
            <span className={Styles.detailValue}>{data.ticketId}</span>
            <span className={Styles.detailLabel}>Ticket Status:</span>
            <span className={Styles.detailValue}>{data.status}</span>
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Date Lost:</span>
            <span className={Styles.detailValue}>{data.dateLost}</span>
            <span className={Styles.detailLabel}>Date Created:</span>
            <span className={Styles.detailValue}>{data.dateCreated}</span>
          </div>
          <div className={Styles.chatContainer}>
            <TicketChat
              ticketId={data.ticketId}
              description={data.description}
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={Styles.modalOverlay} onClick={onClose}>
      <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={Styles.closeButton} onClick={onClose}>
          X
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default MoreDetailsModal;

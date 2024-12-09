import React from "react";
import Styles from "../../styles/modals/moreDetails.module.scss";

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
  if (!isOpen) return null;

  const renderContent = () => {
    if (type === "item") {
      return (
        <>
          <h2>Item Details</h2>
          <p>
            <strong>ID:</strong> {data.itemID}
          </p>
          <p>
            <strong>Description:</strong> {data.description}
          </p>
          <p>
            <strong>Category:</strong> {data.category}
          </p>
          <p>
            <strong>Type:</strong> {data.type}
          </p>
          <p>
            <strong>Route:</strong> {data.route}
          </p>
          <p>
            <strong>Garage:</strong> {data.garage}
          </p>
          <p>
            <strong>Date Lost:</strong> {data.dateLost}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
        </>
      );
    } else if (type === "ticket") {
      return (
        <>
          <h2>Ticket Details</h2>
          <p>
            <strong>ID:</strong> {data.id}
          </p>
          <p>
            <strong>Type:</strong> {data.type}
          </p>
          <p>
            <strong>Brand:</strong> {data.brand}
          </p>
          <p>
            <strong>Colour:</strong> {data.colour}
          </p>
          <p>
            <strong>Date Lost:</strong> {data.datelost}
          </p>
          <p>
            <strong>Date Created:</strong> {data.datecreated}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
        </>
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

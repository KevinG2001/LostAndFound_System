import Styles from "../../styles/modals/moreDetails.module.scss";
import TicketChat from "../TicketChat";

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
        <div className={Styles.detailsContainer}>
          <h2 className={Styles.detailsTitle}>Item Details</h2>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>ID:</span>
            <span className={Styles.detailValue}>{data.itemID}</span>
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Description:</span>
            <span className={Styles.detailValue}>{data.description}</span>
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Category:</span>
            <span className={Styles.detailValue}>{data.category}</span>
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Type:</span>
            <span className={Styles.detailValue}>{data.type}</span>
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Route:</span>
            <span className={Styles.detailValue}>{data.route}</span>
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Garage:</span>
            <span className={Styles.detailValue}>{data.garage}</span>
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Date Lost:</span>
            <span className={Styles.detailValue}>{data.dateLost}</span>
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Status:</span>
            <span className={Styles.detailValue}>{data.status}</span>
          </div>
        </div>
      );
    } else if (type === "ticket") {
      return (
        <div className={Styles.detailsContainer}>
          <h2 className={Styles.detailsTitle}>Ticket Details</h2>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>ID:</span>
            <span className={Styles.detailValue}>{data.ticketId}</span>
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Date Lost:</span>
            <span className={Styles.detailValue}>{data.dateLost}</span>
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Date Created:</span>
            <span className={Styles.detailValue}>{data.dateCreated}</span>
          </div>
          <div className={Styles.detailsRow}>
            <span className={Styles.detailLabel}>Status:</span>
            <span className={Styles.detailValue}>{data.status}</span>
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

import { useState, useEffect } from "react";
import Styles from "../../styles/modals/moreDetails.module.scss";
import ItemDetailsTab from "./tabs/itemDetails";
import TicketDetailsTab from "./tabs/ticketDetails";
import CollectionDetailsTab from "./tabs/collectionDetails";
import HistoryTab from "./tabs/historyDetails";

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
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    if (type === "item" || type === "ticket") {
      setActiveTab("details");
    }
  }, [type]);

  if (!isOpen || !data) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return type === "item" ? (
          <ItemDetailsTab data={data} />
        ) : (
          <TicketDetailsTab data={data} />
        );
      case "collection":
        return <CollectionDetailsTab data={data} />;
      case "history":
        return <HistoryTab data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className={Styles.modalOverlay} onClick={onClose}>
      <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={Styles.closeButton} onClick={onClose}>
          X
        </button>

        {data.imageUrl && (
          <div className={Styles.imageWrapper}>
            <img src={data.imageUrl} alt="Item" className={Styles.itemImage} />
          </div>
        )}

        {type === "item" && (
          <>
            <div className={Styles.detailsTitle}>
              <div className={Styles.articleWrapper}>
                <div className={Styles.itemIdLabel}>Item ID:</div>
                <div className={Styles.itemIdValue}>{data.itemID}</div>
              </div>
            </div>

            <div className={Styles.tabHeader}>
              <button
                className={`${Styles.tabButton} ${
                  activeTab === "details" ? Styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`${Styles.tabButton} ${
                  activeTab === "collection" ? Styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("collection")}
              >
                Collection Details
              </button>
              <button
                className={`${Styles.tabButton} ${
                  activeTab === "history" ? Styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("history")}
              >
                History
              </button>
            </div>
          </>
        )}

        <div className={Styles.tabContent}>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default MoreDetailsModal;

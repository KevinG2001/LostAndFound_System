import { useLocation, useNavigate } from "react-router-dom";
import Styles from "../styles/navStyles.module.scss";
import TicketIcon from "./Icons/TicketIcon";
import BackpackIcon from "./Icons/BackpackIcon";
import PieChartIcon from "./Icons/PieChartIcon";

function Navbar() {
  const navigate = useNavigate();
  const url = useLocation();

  const goToDashboardPage = () => {
    navigate("/");
  };

  const goToItemsPage = () => {
    navigate("/items");
  };

  const goToTickets = () => {
    navigate("/tickets");
  };

  const openNewItemModal = () => {
    navigate("/items", { state: { openNewItemModal: true } });
  };

  return (
    <>
      <div className={Styles.navContainer}>
        <div className={Styles.navWrapper}>
          <div className={Styles.navHeader}>
            <div className={Styles.navTitle}>
              Track<span style={{ color: "green" }}>It</span>Down
            </div>
            <div className={Styles.navSubTitle}>Lost & Found</div>
          </div>
          <div className={Styles.navLinkWrapper}>
            <button className={Styles.navLink} onClick={goToDashboardPage}>
              <PieChartIcon />
              Dashboard
            </button>
            <button className={Styles.navLink} onClick={goToItemsPage}>
              <BackpackIcon />
              Items
            </button>
            {url.pathname === "/items" && (
              <button className={Styles.navLink} onClick={openNewItemModal}>
                New Item
              </button>
            )}

            <button className={Styles.navLink} onClick={goToTickets}>
              <TicketIcon />
              Tickets
            </button>
          </div>
          <div className={Styles.navFooter}>Footer</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

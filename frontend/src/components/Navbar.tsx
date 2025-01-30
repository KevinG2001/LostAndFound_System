import { useNavigate } from "react-router-dom";
import Styles from "../Styles/navStyles.module.scss";
import { color } from "chart.js/helpers";

function Navbar() {
  const navigate = useNavigate();

  const goToDashboardPage = () => {
    navigate("/");
  };

  const goToItemsPage = () => {
    navigate("/items");
  };

  const goToTickets = () => {
    navigate("/tickets");
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
              Dashboard
            </button>
            <button className={Styles.navLink} onClick={goToItemsPage}>
              Items
            </button>
            <button className={Styles.navLink} onClick={goToTickets}>
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

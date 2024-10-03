import { useNavigate } from "react-router-dom";
import Styles from "../Styles/navStyles.module.scss";

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
            Lost
            <br />&<br />
            Found
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

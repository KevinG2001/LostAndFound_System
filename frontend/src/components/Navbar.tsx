import Styles from "../Styles/navStyles.module.scss";

function Navbar() {
  return (
    <>
      <div className={Styles.navContainer}>
        <div className={Styles.navWrapper}>
          <div className={Styles.navHeader}>Header</div>
          <div className={Styles.navLinkWrapper}>
            <div className={Styles.navLink}>Dashboard</div>
            <div className={Styles.navLink}>Items</div>
            <div className={Styles.navLink}>Tickets</div>
          </div>
          <div className={Styles.navFooter}>Footer</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

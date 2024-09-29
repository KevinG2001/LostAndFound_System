import Styles from "../Styles/navStyles.module.scss";

function Navbar() {
  return (
    <>
      <div className={Styles.navContainer}>
        <div className={Styles.navWrapper}>
          <div className={Styles.navHeader}>Header</div>
          <div className={Styles.navLinks}>
            <div>Dashboard</div>
            <div>Items</div>
            <div>Tickets</div>
          </div>
          <div className={Styles.navFooter}>Footer</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

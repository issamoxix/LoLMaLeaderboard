import styles from "../styles/Navbar.module.css";
import Popup_cus from "./Popup_cus";
const Navbar = () => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
        <h2>LolRankingMa</h2>
      </div>
      <div className={styles.Register}>
        <Popup_cus title="Register" />
      </div>
    </nav>
  );
};

export default Navbar;

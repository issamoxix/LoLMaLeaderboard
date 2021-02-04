import styles from "../styles/Navbar.module.css";
const Navbar = () => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
        <h2>LolRankingMa</h2>
      </div>
      <div className={styles.Register}>
        <button>Register</button>
      </div>
    </nav>
  );
};

export default Navbar;

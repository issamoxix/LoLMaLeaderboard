import React from "react";
import styles from "../../styles/dt/Home.module.css";

function SideBody({ page, dis }) {
  return (
    <div className={styles.SideBody}>
      <ul>
        <li
          className={`${styles.ListNav} ${page == "Home" && styles.activeNav}`}
          onClick={() => dis({ type: "H" })}
        >
          Home
        </li>
        <li
          className={`${styles.ListNav} ${
            page == "Ladder" && styles.activeNav
          }`}
          onClick={() => dis({ type: "L" })}
        >
          LeaderBoard
        </li>
      </ul>
    </div>
  );
}

export default SideBody;

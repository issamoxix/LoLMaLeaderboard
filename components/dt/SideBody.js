import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/dt/Home.module.css";

function SideBody({ page, dis }) {
  const router = useRouter();

  return (
    <div className={styles.SideBody}>
      <ul>
        <li
          className={`${styles.ListNav} ${page == "Home" && styles.activeNav}`}
          onClick={() =>
            router.push(`/?page=${"H"}`, undefined, { shallow: true })
          }
        >
          Home
        </li>
        <li
          className={`${styles.ListNav} ${
            page == "Ladder" && styles.activeNav
          }`}
          onClick={() =>
            router.push(`/?page=${"L"}`, undefined, { shallow: true })
          }
        >
          LeaderBoard
        </li>
        <li
          className={`${styles.ListNav} ${
            page == "Champions" && styles.activeNav
          }`}
          onClick={() =>
            router.push(`/?page=${"C"}`, undefined, { shallow: true })
          }
        >
          Champions
        </li>
      </ul>
    </div>
  );
}

export default SideBody;

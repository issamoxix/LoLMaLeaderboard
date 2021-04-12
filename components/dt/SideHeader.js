import React from "react";
import styles from "../../styles/dt/Home.module.css";

function SideHeader() {
  return (
    <div className={styles.SideHeader}>
      <a href="/">
        <img src="/logo/logo.png" alt="lolrankmaroc" />
      </a>
    </div>
  );
}

export default SideHeader;

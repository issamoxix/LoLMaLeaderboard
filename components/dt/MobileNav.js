import React from "react";
import styles from "../../styles/dt/Com.module.css";

function MobileNav({ hide, varx, label }) {
  return (
    <div className={styles.MobileContainer}>
      <img onClick={() => hide(!varx)} src="/svgs/ham.svg" />
      <h2> {label} </h2>
    </div>
  );
}

export default MobileNav;

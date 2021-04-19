import React from "react";
import styles from "../../styles/dt/Com.module.css";
function Mcom(props) {
  return (
    <div
      style={{ backgroundImage: `url("${props.url}")` }}
      className={styles.Wrapper}
    >
      {props.children}
    </div>
  );
}

export default Mcom;

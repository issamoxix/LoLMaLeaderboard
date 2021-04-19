import React from "react";
import styles from "../../styles/dt/Com.module.css";

function NasCom(props) {
  return (
    <div
      style={{ backgroundImage: `url("${props.url}")` }}
      className={styles.NasWrapper}
    >
      {props.children}
    </div>
  );
}

export default NasCom;

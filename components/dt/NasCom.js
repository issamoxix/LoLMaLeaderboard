import React from "react";
import styles from "../../styles/dt/Com.module.css";

function NasCom(props) {
  return <div className={styles.NasWrapper}>{props.children}</div>;
}

export default NasCom;

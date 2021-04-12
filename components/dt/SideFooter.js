import React from "react";
import styles from "../../styles/dt/Home.module.css";

function SideFooter(props) {
  return <div className={styles.SideFooter}>{props.children}</div>;
}

export default SideFooter;

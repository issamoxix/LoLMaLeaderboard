import React from "react";
import styles from "../../../styles/Chamions/Choose.module.css";

function IconsWrapper(props) {
  return <div className={styles.MainWrapper}>{props.children}</div>;
}

export default IconsWrapper;

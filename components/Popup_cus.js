import React from "react";
import Popup from "reactjs-popup";
import styles from "../styles/Popup.module.css";
export default function Popup_cus({ title }) {
  return (
    <>
      <Popup
        trigger={<button className={styles.join_btn}> {title} </button>}
        modal
        nested
      >
        {(close) => (
          <div className={styles.modal}>
            <div className={styles.header}>
              {" "}
              <h2>Register</h2>
              <button className={styles.close} onClick={close}>
                &times;
              </button>{" "}
            </div>
            <div className={styles.content}>
              <input type="text" placeholder="Summoner Name" />
              <button className={styles.rg}>Register</button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}

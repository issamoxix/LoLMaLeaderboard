import React, { useState } from "react";
import styles from "../../styles/dt/Modal.module.css";
function Modal({ show }) {
  const [input, setInput] = useState();
  const [loading, setLoading] = useState(false);
  const handleAdd = async () => {
    setLoading(true);
    const res = await fetch(`/api/add?name=${input}`);
    setInput("");
    setLoading(false);
  };
  return (
    <>
      <div onClick={() => show(false)} className={styles.Wrapper}></div>
      <div className={styles.Modal}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <input
            type="text"
            placeholder="Summoner Name"
            onChange={(e) => setInput(e.target.value)}
            className={styles.InputSum}
          />
          <button className={styles.subBtn}>Add</button>
          {loading && (
            <img
              alt="Loading"
              src="https://developer.riotgames.com/static/img/katarina.55a01cf0560a.gif"
              className={styles.loading}
            />
          )}
        </form>
      </div>
    </>
  );
}

export default Modal;

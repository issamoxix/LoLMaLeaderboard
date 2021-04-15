import React, { useState } from "react";
import styles from "../../styles/dt/Modal.module.css";
import toast, { Toaster } from "react-hot-toast";

function Modal({ show }) {
  const [input, setInput] = useState();
  const [loading, setLoading] = useState(false);
  const handleAdd = async () => {
    setLoading(true);
    const res = await fetch(`/api/add?name=${input}`);
    setInput("");
    setLoading(false);
    toast(
      <div className={styles.message}>
        You have been <b>Added</b>
      </div>,
      {
        icon: <img src="/svgs/info.svg" alt="info" />,
        style: {
          borderRadius: "5px",
          background: "#161a2e",
          color: "#ddd",
        },
      }
    );
  };
  return (
    <>
      <div onClick={() => show(false)} className={styles.Wrapper}></div>
      <Toaster />
      <div className={styles.Modal}>
        <img src="/svgs/Modal.svg" className={styles.ModalSVG} />
        <img
          src="/svgs/closeModal.svg"
          onClick={() => show(false)}
          className={styles.closeModalSVG}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <h2 className={styles.ModalLabel}>Register</h2>
          <input
            type="text"
            placeholder="Summoner Name"
            onChange={(e) => setInput(e.target.value)}
            className={styles.InputSum}
          />
          <button className={styles.subBtn}>
            {" "}
            {loading ? "Loading ..." : "Add"}{" "}
          </button>
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

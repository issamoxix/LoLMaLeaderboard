import React from "react";
import styles from "../../styles/dt/Com.module.css";

function Landing({ show }) {
  return (
    <div className={styles.Lu}>
      <h2>League of Legends Moroccan LeaderBoard</h2>
      <p>league of legends leaderboard created by LoLma Community</p>
      <div className={styles.hibtn}>
        <button className={styles.btnreg} onClick={() => show(true)}>
          Register
        </button>
        {/* <button className={styles.ladder}>Ladder</button> */}
      </div>
    </div>
  );
}

export default Landing;

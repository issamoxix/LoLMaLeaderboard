import React from "react";
import styles from "../../styles/dt/Home.module.css";

function Infos() {
  return (
    <div className={styles.InfosContainer}>
      <h2 className={styles.Infotitle}>This is just a demo </h2>
      <p className={styles.para}>
        Im still working on this website so if there any bugs or feedback
        contact me on my Socials or add me on Discord Issam#6576 if you are
        interested and wanna contribute Click the github icon below
      </p>
      <div className={styles.Socials}>
        <a href="https://github.com/issamoxix/LoLMaLeaderboard">
          <i className="fa fa-github" aria-hidden="true"></i>
        </a>
        <a href="https://web.facebook.com/issam.haidaoui/">
          <i class="fa fa-facebook" aria-hidden="true"></i>
        </a>
        <a href="https://twitter.com/issamoxix">
          <i class="fa fa-twitter" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}

export default Infos;

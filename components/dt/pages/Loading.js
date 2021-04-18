import React from "react";
import styles from "../../../styles/dt/Home.module.css";
import Mcom from "../Mcom";

function Loading() {
  return (
    <div className={styles.LoadingContainer}>
      {/* <img src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif" /> */}
      <img src="https://media1.giphy.com/media/JtAyhyJOetYDsBbjmj/giphy.gif" />
      <h2>Loading ...</h2>
    </div>
  );
}

export default Loading;

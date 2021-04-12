import React from "react";
import { useEffect } from "react";
import styles from "../../styles/dt/Table.module.css";

function Pagnition({ pages, nextPage }) {
  const lli = [];
  for (let i = 0; i < pages; i++) {
    lli.push(1);
  }
  return (
    <div className={styles.pag}>
      <ul>
        {lli.map((d, key) => (
          <li onClick={() => nextPage((key + 1) * 10)}> {key + 1} </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagnition;

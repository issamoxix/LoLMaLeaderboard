import React, { useEffect, useState } from "react";
import styles from "../../styles/dt/Table.module.css";
function Table({ data, refresh, active = 1, loading }) {
  const [mob, setMob] = useState(false);
  useEffect(() => {
    window.innerWidth <= 900 && setMob(true);
  }, []);

  return (
    <table className={styles.Table}>
      <tr className={styles.TR}>
        <th>
          <div className={styles.fTHeader}>#</div>
        </th>
        <th>
          <div className={styles.itemsth}>
            <h3>Summoners </h3>
            <img
              onClick={() => refresh((active - 1) * 10)}
              src="/svgs/refresh.svg"
              alt="refresh"
            />{" "}
          </div>
        </th>
        <th>
          <h3>Tier</h3>
        </th>
        <th>
          <h3>Lp</h3>
        </th>
        <th>
          <h3>Level</h3>
        </th>
        <th>
          <h3>{mob ? "W/R" : "Win Rate"}</h3>
        </th>
      </tr>
      {loading && (
        <img
          alt="Loading"
          src="https://developer.riotgames.com/static/img/katarina.55a01cf0560a.gif"
          // className={styles.loading}
        />
      )}
      {data &&
        data.map((d, key) => (
          <tr>
            <td>{key + 1 + 10 * (active - 1)} </td>

            <td>
              <div className={styles.infowrapper}>
                {" "}
                <img
                  src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${d.icon}.jpg?image=q_auto:best&v=1518361200`}
                />
                <p> {d.name} </p>
              </div>
            </td>
            <td> {`${mob ? d.tier[0] : d.tier} ${d.rank}`} </td>
            <td> {d.lp} </td>
            <td> {d.level} </td>
            <td> {`${((d.W * 100) / (d.W + d.L)).toFixed(2)}%`} </td>
          </tr>
        ))}
    </table>
  );
}

export default Table;

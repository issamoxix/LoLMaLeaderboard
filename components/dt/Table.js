import React from "react";
import styles from "../../styles/dt/Table.module.css";
function Table({ data, active = 1, loading }) {
  return (
    <table className={styles.Table}>
      <tr className={styles.TR}>
        <th>#</th>
        <th>Summoners</th>
        <th>Tier</th>
        <th>Lp</th>
        <th>Level</th>
        <th>Win Rate</th>
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
            <td> {`${d.tier} ${d.rank}`} </td>
            <td> {d.lp} </td>
            <td> {d.level} </td>
            <td> {`${((d.W * 100) / (d.W + d.L)).toFixed(2)}%`} </td>
          </tr>
        ))}
    </table>
  );
}

export default Table;

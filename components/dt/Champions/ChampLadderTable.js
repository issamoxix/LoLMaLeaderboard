import React, { useEffect, useState } from "react";
import styles from "../../../styles/dt/Table.module.css";
function ChampLadderTable({ data, refresh, active = 1, loading, em = false }) {
  const [mob, setMob] = useState(false);
  useEffect(() => {
    window.innerWidth <= 900 && setMob(true);
  }, []);

  return (
    <table className={styles.Table}>
      <tr className={styles.TR}>
        <th>#</th>
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
          <h3>CHAMPION MASTERY</h3>
        </th>

        <th>
          <h3>Level</h3>
        </th>
      </tr>
      {em && (
        <tr>
          <td colSpan="4">
            <h3 className={styles.EmptyBuc}>
              There is no data here Register in the field above{" "}
            </h3>
          </td>
        </tr>
      )}
      {loading && (
        <img
          alt="Loading"
          src="https://developer.riotgames.com/static/img/katarina.55a01cf0560a.gif"
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
                  src={`https://static.bigbrain.gg/assets/lol/riot_static/13.22.1/img/profileicon/${d.icon}.png`}
                  style={{ width: "40px" }}
                />
                <p> {d.name} </p>
              </div>
            </td>

            <td> {d.championPoints} </td>
            <td> {d.championLevel} </td>
          </tr>
        ))}
    </table>
  );
}

export default ChampLadderTable;

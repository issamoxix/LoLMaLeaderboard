import React, { useEffect, useState } from "react";
import styles from "../../styles/dt/Table.module.css";
import toast, { Toaster } from "react-hot-toast";

function Table({ data, refresh, active = 1, loading }) {
  const [mob, setMob] = useState(false);
  const [loadingx, setLoading] = useState(false);
  useEffect(() => {
    window.innerWidth <= 900 && setMob(true);
  }, []);
  const handleAdd = async (input) => {
    setLoading(true);
    const res = await fetch(`/api/add?name=${input}`);
    setLoading(false);
    toast(
      <div>
        <b>Refreshed</b>
      </div>,
      {
        icon: <img src="/svgs/info.svg" alt="info" />,
        style: {
          borderRadius: "5px",
          background: "#ddd",
          color: "#000",
        },
      }
    );
    refresh((active - 1) * 10);
  };
  return (
    <table className={styles.Table}>
      <Toaster />
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

            <td onClick={() => handleAdd(d.name)} style={{ cursor: "pointer" }}>
              <div className={styles.infowrapper}>
                {" "}
                <img
                  src={`https://static.bigbrain.gg/assets/lol/riot_static/13.22.1/img/profileicon/${d.icon}.png`}
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

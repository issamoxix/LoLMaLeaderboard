import { Avatar } from "@material-ui/core";
import Table from "react-bootstrap/Table";

import { useState, useEffect } from "react";

export default function Ladder_tabble({ rank_all }) {
  const [data, setData] = useState();

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Summoner Name </th>
            <th>Tier</th>
            <th>LP</th>
            <th>Level</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((d, k) => (
              <tr key={k + 1}>
                <td style={{ verticalAlign: "middle" }}>{rank + k + 1}</td>
                <td>
                  <h4
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 400,
                    }}
                  >
                    <Avatar
                      src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/${d.icon}.png`}
                    />
                    <span style={{ marginRight: "10px" }}></span>
                    {d.name}
                  </h4>{" "}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  {" "}
                  {d.tier === "CHALLENGER"
                    ? d.tier
                    : `${d.tier} ${d.rank}`}{" "}
                </td>
                <td style={{ verticalAlign: "middle" }}> {d.lp} </td>
                <td style={{ verticalAlign: "middle" }}> {d.level} </td>
                <td style={{ verticalAlign: "middle" }}>
                  {" "}
                  {`${((d.W * 100) / (d.W + d.L)).toFixed(2)}%`}{" "}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <center>
                  <img
                    alt="Loading"
                    src="https://developer.riotgames.com/static/img/katarina.55a01cf0560a.gif"
                  />
                </center>
              </td>
            </tr>
          )}
          {/* <tr>
          <td>3</td>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
        </tbody>
      </Table>
    </>
  );
}

import { Avatar } from "@material-ui/core";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import styles from "../styles/Table.module.css";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Table_Data({ limite, tresh, setTresh }) {
  const [data, setData] = useState();
  const [rank, setRank] = useState(0);
  const [active, setActive] = useState(1);
  const [pages, setPages] = useState();
  const handleDefault = () => {
    setRank(0);
    setActive(1);
  };
  const get_data = async (skip = 0) => {
    setData();
    const res = await fetch(`/api/hello?skip=${skip}&limite=${limite}`);
    const json = await res.json();

    setData(json.data);
    setPages(
      (json.ct / limite) % 1 == 0
        ? json.ct / limite
        : parseInt(json.ct / limite + 1)
    );
  };

  let items = [];
  let n;
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          setRank((number - 1) * limite);

          number === 1
            ? get_data((number - 1) * limite)
            : get_data((number - 1) * limite); // add a +1 if u find any errors
          setActive(number);
        }}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    handleDefault();
    get_data();
    setTresh(false);
  }, [tresh]);
  useEffect(() => {
    get_data();
  }, []);
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
                      src={`https://static.bigbrain.gg/assets/lol/riot_static/13.22.1/img/profileicon/${d.icon}.png`}
                    />
                    <span style={{ marginRight: "10px" }}></span>
                    <Link style={{
                          color: "initial",
                          textDecorationStyle: "none",
                        }} href={`/ranking/${d.name}`}>
                        {d.name}
                    </Link>
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
      {data && <Pagination>{items}</Pagination>}
    </>
  );
}

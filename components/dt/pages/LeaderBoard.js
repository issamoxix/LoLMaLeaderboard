import React, { useEffect, useState } from "react";
import { Data } from "../data";
import Mcom from "../Mcom";
import Pagnition from "../Pagnition";
import Table from "../Table";
import styles from "../../../styles/dt/Table.module.css";
import { useRouter } from "next/router";

function LeaderBoard() {
  const [data, setData] = useState();
  const [active, setActive] = useState(1);
  const [pages, setPages] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { page } = router.query;
  const { index } = router.query;
  const get_data = async (skip = 0, limite = 10) => {
    setData();
    setLoading(true);
    const res = await fetch(`/api/hello?skip=${skip}&limite=${limite}`);
    const json = await res.json();

    setData(json.data);

    setPages(
      (json.ct / limite) % 1 == 0
        ? json.ct / limite
        : parseInt(json.ct / limite + 1)
    );
    setLoading(false);
  };
  const lli = [];
  for (let i = 0; i < pages; i++) {
    lli.push(1);
  }
  useEffect(() => {
    get_data();
  }, []);
  useEffect(() => {
    get_data((index - 1) * 10);
    setActive(index);
  }, [index]);
  return (
    <Mcom>
      <Table data={data} refresh={get_data} active={active} loading={loading} />
      <div className={styles.pag}>
        <ul>
          {lli.map((d, key) => (
            <li
              onClick={() => {
                router.push(`/?page=${page}&index=${key + 1}`, undefined, {
                  shallow: true,
                });
                // get_data(key * 10);
                // setActive(key + 1);
              }}
              style={{ filter: parseInt(index) === key + 1 && "brightness(1)" }}
            >
              {" "}
              {key + 1}{" "}
            </li>
          ))}
        </ul>
      </div>
      {/* <Pagnition pages={pages} nextPage={get_data} /> */}
    </Mcom>
  );
}

export default LeaderBoard;

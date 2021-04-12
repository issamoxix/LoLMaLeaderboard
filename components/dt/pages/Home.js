import { animated, useSpring } from "@react-spring/web";
import React, { useState } from "react";
import Infos from "../Infos";
import Landing from "../Landing";
import Mcom from "../Mcom";
import Modal from "../Modal";
import NasCom from "../NasCom";
import Table from "../Table";
import styles from "../../../styles/dt/Home.module.css";
import { useEffect } from "react";
import { Data } from "../data";

function HomeComp() {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const animation = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0%)" : "translateY(-50%)",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    display: !show && "none",
  });
  const get_data = async () => {
    setData();
    setLoading(true);
    const res = await fetch(`/api/hello?skip=0&limite=10`);
    const json = await res.json();

    setData(json.data);
    setLoading(false);
  };
  useEffect(() => {
    get_data();
  }, []);
  return (
    <>
      {/* <Mcom>
<Landing />
</Mcom> */}
      <animated.div style={animation}>
        <Modal show={setShow} />
      </animated.div>
      <NasCom>
        <Landing show={setShow} />
      </NasCom>
      <NasCom>
        <Infos />
      </NasCom>
      <Mcom>
        <h1 className={styles.topplayer}>Top 10 Moroccan Players</h1>
        <Table data={data} loading={loading} />
      </Mcom>
    </>
  );
}

export default HomeComp;

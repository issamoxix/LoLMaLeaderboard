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
import Head from "next/head";
import { useRouter } from "next/router";

function HomeComp() {
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
    const res = await fetch(`/api/hello?skip=0&limit=10`);
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
      <Head>
        <title>LoLma LeaderBoard</title>
      </Head>
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
        <h2 className={styles.topplayer}>Top 10 Moroccan Players in Solo Q</h2>
        <Table data={data} refresh={get_data} loading={loading} />
        <button
          className={styles.showMore}
          onClick={() =>
            router.push(`/?page=${"L"}`, undefined, { shallow: true })
          }
        >
          Show More
        </button>
      </Mcom>
    </>
  );
}

export default HomeComp;

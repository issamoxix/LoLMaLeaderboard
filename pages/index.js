import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";
import Head from "next/head";
import React, { useReducer, useState } from "react";
import Home from ".";
import { Data } from "../components/dt/data";
import Infos from "../components/dt/Infos";
import Landing from "../components/dt/Landing";
import Mcom from "../components/dt/Mcom";
import Modal from "../components/dt/Modal";
import NasCom from "../components/dt/NasCom";
import SideBody from "../components/dt/SideBody";
import SideFooter from "../components/dt/SideFooter";
import SideHeader from "../components/dt/SideHeader";
import Table from "../components/dt/Table";
import styles from "../styles/dt/Home.module.css";
import HomeComp from "../components/dt/pages/Home";
import LeaderBoard from "../components/dt/pages/LeaderBoard";
import MobileNav from "../components/dt/MobileNav";
import { useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "H":
      return { comp: <HomeComp />, label: "Home" };
    case "L":
      return { comp: <LeaderBoard />, label: "Ladder" };
    default:
      return { comp: <HomeComp />, label: "Home" };
  }
}

function dt() {
  const [{ comp, label }, dispatch] = useReducer(reducer, {
    comp: <HomeComp />,
    label: "Home",
  });
  const [show, setShow] = useState(false);
  const [Mob, setM] = useState(false);
  const [toggle, settoggle] = useState(true);
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
  useEffect(() => {
    window.innerWidth <= 900 && setM(true);
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>LoLRankMaroc</title>
        <meta
          name="description"
          content="League of legends Moroccan Leaderboard , ranking top Moroccan Players"
        />
        <meta
          name="keywords"
          content="league of legends,lolma,lol Maroc, league of legends Maroc, Moroccan Leaderboard , Top Morrcan Player"
        />
        <meta name="author" content="Issam.H" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
          crossorigin="anonymous"
        />
      </Head>
      <div
        style={{ transform: Mob && toggle && "translateX(-100%)" }}
        className={`${styles.sideBar} `}
      >
        <SideHeader></SideHeader>
        <SideBody page={label} dis={dispatch}></SideBody>
        <SideFooter>
          <button onClick={() => setShow(!show)} className={styles.regBtn}>
            Register
          </button>
        </SideFooter>
      </div>
      <div className={styles.Main}>
        {Mob && <MobileNav varx={toggle} hide={settoggle} label={label} />}
        <animated.div style={animation}>
          <Modal show={setShow} />
        </animated.div>
        {comp}
      </div>
    </div>
  );
}

export default dt;

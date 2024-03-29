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
import Router, { useRouter } from "next/router";
import nProgress from "nprogress";
import Champions from "../components/dt/pages/Champions";
import Loading from "../components/dt/pages/Loading";
import ChampLadder from "../components/dt/pages/ChampLadder";
import { MetaHeads } from "../util/meta/MetaHead"

Router.onRouteChangeStart = (url) => {
  nProgress.start();
};

Router.onRouteChangeComplete = () => nProgress.done();
function reducer(state, action) {
  switch (action.type) {
    case "H":
      return { comp: <HomeComp />, label: "Home" };
    case "L":
      return { comp: <LeaderBoard />, label: "Ladder" };
    case "C":
      return { comp: <Champions />, label: "Champions" };
    case "CL":
      return { comp: <ChampLadder />, label: "Champions" };
    case "Loading":
      return { comp: <Loading />, label: "Loading ..." };
    default:
      return { comp: <Loading />, label: "Loading ..." };
  }
}

function dt() {
  const [{ comp, label }, dispatch] = useReducer(reducer, {
    comp: <Loading />,
    label: "Loading ...",
  });
  const router = useRouter();
  const { query } = router;
  const page = query.page;
  const count = parseInt(query.count || 1, 10);
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
    console.log(page);

    if (router.asPath == "/") {
      router.push(`/?page=${"H"}`, undefined, { shallow: true });
    }
    dispatch({ type: page });
  }, []);
  useEffect(() => {
    dispatch({ type: page });
  }, [page]);

  return (
    <div className={styles.container}>
      <Head>
        {MetaHeads.map((meta) =>
          <meta name={meta.name} content={meta.content} />
        )}
        <meta charset="UTF-8"></meta>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
          crossorigin="anonymous"
        />

        <link rel="icon" href="https://lolma.vercel.app/logo/logo3.png" />
        {/* nprogress files */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossorigin="anonymous"
        />
        <script
          data-ad-client="ca-pub-7223878406940983"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
      </Head>
      {!toggle && (
        <div
          onClick={() => settoggle(true)}
          className={styles.sideWrapeprs}
        ></div>
      )}
      <div
        style={{ transform: Mob && !toggle && "translateX(0%)" }}
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

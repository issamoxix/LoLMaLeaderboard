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
import ReactPixel from "react-facebook-pixel";

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

{
  /* <script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1439439406396220');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1439439406396220&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code --> */
}
function dt() {
  const options = {
    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    debug: false, // enable logs
  };
  ReactPixel.init("1439439406396220", options);
  ReactPixel.pageView();
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
        <meta
          name="description"
          content="League of legends Moroccan Solo Q Leaderboard , ranking top Moroccan Players"
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

        <meta
          name="image"
          content="https://lolrankmaroc.live/images/banner.jpg"
        />
        <meta
          property="og:image"
          content="https://lolrankmaroc.live/images/banner.jpg"
        />
        <meta
          name="twitter:image"
          content="https://lolrankmaroc.live/images/banner.jpg"
        ></meta>

        <meta property="og:title" content="lolrankmaroc.live" />
        <meta name="twitter:title" content="lolrankmaroc.live" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lolrankmaroc.live/" />
        <meta
          property="og:description"
          content="league of legends,lolma,lol Maroc, league of legends Maroc, Moroccan Leaderboard , Top Morrcan Player"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@issamoxix" />
        <meta
          name="twitter:description"
          content="league of legends,lolma,lol Maroc, league of legends Maroc, Moroccan Leaderboard , Top Morrcan Player"
        />
        <meta name="theme-color" content="#141726"></meta>
        <link rel="icon" href="https://lolrankmaroc.live/logo/logo3.png" />
        {/* nprogress files */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossorigin="anonymous"
        />
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

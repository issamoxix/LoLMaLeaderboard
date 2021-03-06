import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import _data from "../assets/quotes/qts.json";
import _data_name from "../assets/quotes/name.json";
import Table_Data from "../components/Table";
import Popup_cus from "../components/Popup_cus";
// import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../components/SideBar";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [{ name, quote }, setQuote] = useState({
    name: "Yasuo",
    quote: '"Death is like the wind - always by my side."',
  });

  const slide_quote = () => {
    let n = 500;
    setInterval(() => {
      let rn = 157;
      let generate = () => {
        rn = Math.floor(Math.random() * n) + 1;
        let ch_dik = _data_name.data[rn];
        if (!ch_dik) {
          return generate();
        }
      };
      generate();
      let ch_name = _data_name.data[rn] ? _data_name.data[rn].name : "Yasuo";

      try {
        let ch_quotes = _data[ch_name].quotes["Champion Select"];
        let ch_quote = ch_quotes
          ? ch_quotes[Object.keys(ch_quotes)[0]]
          : '"Death is like the wind - always by my side."';

        setQuote({
          name: ch_name,
          quote: ch_quote,
        });
      } catch (e) {}
    }, 6000);
  };

  useEffect(() => {
    slide_quote();
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
      </Head>
      <Navbar refresh={refresh} setRefresh={setRefresh} />
      <div className={styles.heroContainer}>
        <div className={styles.wrapper}>
          <h1>League of Legends Moroccan Leaderboard</h1>
          <h2>
            {quote} <span>-{name} </span>
          </h2>
          <Popup_cus title="Register Now" fresh={refresh} setfre={setRefresh} />
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <div className={styles.Ads}></div>
        <div className={styles.table}>
          <Table_Data limite={10} tresh={refresh} setTresh={setRefresh} />
        </div>
        <div className={styles.Ads}></div>
      </div>
    </div>
  );
}

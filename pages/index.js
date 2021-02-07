import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import _data from "../assets/quotes/qts.json";
import _data_name from "../assets/quotes/name.json";
import Table from "../components/Table";
import Popup_cus from "../components/Popup_cus";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [{ name, quote }, setQuote] = useState({
    name: "Yasuo",
    quote: '"Death is like the wind - always by my side."',
  });
  const [__data, set_data] = useState([]);

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

  const get_data = async () => {
    const res = await fetch(`/api/hello`);
    const json = await res.json();
    set_data(json);
  };

  useEffect(() => {
    get_data();
  }, []);
  useEffect(() => {
    slide_quote();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>LolRankingMaroc</title>
        <meta name="description" content="Lol Moroccan Leaderboard" />
        <meta name="keywords" content="league of legends,lolma,Maroc" />
        <meta name="author" content="Lol Ranking Maroc" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <div className={styles.heroContainer}>
        <div className={styles.wrapper}>
          <h1>League of Legends Moroccan Leaderboard</h1>
          <h2>
            {quote} <span>-{name} </span>
          </h2>
          <Popup_cus title="Register Now" />
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <div className={styles.Ads}></div>
        <div className={styles.table}>
          <Table data={__data} set={set_data} />
        </div>
        <div className={styles.Ads}></div>
      </div>
    </div>
  );
}

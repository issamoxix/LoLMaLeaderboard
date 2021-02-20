import SideBar from "../../components/SideBar";
import Navbar from "../../components/Navbar";
import Table_Data from "../../components/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import styles from "../../styles/ranking.module.css";
import Head from "next/head";
export default function ranking() {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>LeaderBoard Maroc</title>
        <meta
          name="description"
          content="League of legends Moroccan leaderboard , ranking top Moroccan Players"
        />
        <meta
          name="keywords"
          content="league of legends,lolma,lol Maroc, league of legends Maroc, Moroccan Leaderboard , Top Morrcan Player"
        />
        <meta name="author" content="Issam.H" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar refresh={refresh} setRefresh={setRefresh} />

      <div className={styles.table_container}>
        <div className={styles.ads}></div>
        <div className={styles.table}>
          <Table_Data limite={100} tresh={refresh} setTresh={setRefresh} />
        </div>
        <div className={styles.ads}></div>
      </div>
    </div>
  );
}

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import Popup_cus from "./Popup_cus";
const Navbar = ({ refresh, setRefresh }) => {
  const [input, setinpt] = useState();
  return (
    <div className={styles.header}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.logo_container}>
        <h2>LoLRankMaroc</h2>
      </div>
      <div className={styles.nav_container}>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            <li className={styles.list_item}>
              <Link href="/">
                <a className={styles.nav_link}>Home</a>
              </Link>
            </li>
            <li className={styles.list_item}>
              <Link href="/ranking">
                <a className={styles.nav_link}>Ranking</a>
              </Link>
            </li>
            <li className={styles.list_item}>
              <Link href="/">
                <a className={styles.nav_link}>Champions</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.search_container}>
          <form action={`/ranking/${input}`}>
            <input
              onChange={(e) => setinpt(e.target.value)}
              type="text"
              placeholder="Summoner Name"
            />
          </form>
        </div>
        <Popup_cus title="Register" fresh={refresh} setfre={setRefresh} />
      </div>
    </div>
  );
};

export default Navbar;

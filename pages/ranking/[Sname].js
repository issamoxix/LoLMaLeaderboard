import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Sname.module.css";
export default function Srank() {
  const router = useRouter();
  const { Sname } = router.query;
  const name = Sname;
  const data = {
    Mrank: 10,
    lp: 70,
    name: Sname,
    level: 303,
    rank: "Gold",
    icon:
      "http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/28.png",
    tier:
      "https://img.rankedboost.com/wp-content/uploads/2014/09/Season_2019_-_Gold_1.png",
  };
  return (
    <>
      {/* S stand for Summoner */}
      <Head>
        <title> {name && name.toUpperCase()} Rank </title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.detail}>
          <img
            className={styles.Sicon}
            src={data.icon}
            alt="league of legends icon"
          />
          <div className={styles.Slevel}>
            <p>{data.level} </p>
          </div>
          <div className={styles.Sname}>
            <h1>
              <span className={styles.Mrank}>#{data.Mrank}</span>{" "}
              {data.name && data.name.toUpperCase()}
            </h1>
          </div>
          <div className={styles.Srank}>
            <h2>{data.rank}</h2>
          </div>
          <div className={styles.Stier}>
            <img
              className={styles.tier}
              src={data.tier}
              alt="league of legends tier icon"
            />
          </div>
          <div className={styles.Slp}>
            <p>{data.lp} LP</p>
          </div>
        </div>
        <div className={styles.ladder}></div>
      </div>
    </>
  );
}

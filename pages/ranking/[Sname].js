import Head from "next/head";
import { Avatar } from "@material-ui/core";
import Table from "react-bootstrap/Table";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
// import Ladder_tabble from "../../components/ladder_table";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Sname.module.css";

export default function Srank({ sdata, tdata }) {
  const router = useRouter();

  const { Sname } = router.query;
  const name = Sname;
  const data = sdata;

  // const data = {
  //   Mrank: 10,
  //   lp: 70,
  //   name: Sname,
  //   level: 303,
  //   rank: "Gold",
  //   icon:
  //     "http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/28.png",
  //   tier:
  //     "https://img.rankedboost.com/wp-content/uploads/2014/09/Season_2019_-_Gold_1.png",
  // };
  return (
    <>
      {/* S stand for Summoner */}
      <Head>
        <title> {name && name.toUpperCase()} Rank </title>
        <meta
          name="description"
          content={`${data.name && data.name.toUpperCase()} Rank ${
            data.Mrank
          } In Morocco League of legends`}
        />
        <meta
          name="keywords"
          content="league of legends,lolma,lol Maroc, league of legends Maroc, Moroccan Leaderboard , Top Morrcan Player"
        />
        <meta name="author" content="Issam.H" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:image"
          content={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/${data.icon}.png`}
        ></meta>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.detail}>
          <img
            className={styles.Sicon}
            src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/${data.icon}.png`}
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
            <h2>
              {data.tier} {data.rank}
            </h2>
          </div>
          <div className={styles.Stier}>
            <img
              className={styles.tier}
              src={`/tier/${data.tier}.png`}
              alt="league of legends tier icon"
            />
          </div>
          <div className={styles.Slp}>
            <p>{data.lp} LP</p>
          </div>
        </div>
        <div className={styles.ladder}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Summoner Name </th>
                <th>Tier</th>
                <th>LP</th>
                <th>Level</th>
                <th>Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {tdata ? (
                tdata.map((d, k) => (
                  <tr key={k + 1}>
                    <td style={{ verticalAlign: "middle" }}>
                      {data.Mrank + k}
                    </td>
                    <td>
                      <h4
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 400,
                        }}
                      >
                        <Avatar
                          src={`http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/${d.icon}.png`}
                        />
                        <span style={{ marginRight: "10px" }}></span>
                        {d.name}
                      </h4>{" "}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {" "}
                      {d.tier === "CHALLENGER"
                        ? d.tier
                        : `${d.tier} ${d.rank}`}{" "}
                    </td>
                    <td style={{ verticalAlign: "middle" }}> {d.lp} </td>
                    <td style={{ verticalAlign: "middle" }}> {d.level} </td>
                    <td style={{ verticalAlign: "middle" }}>
                      {" "}
                      {`${((d.W * 100) / (d.W + d.L)).toFixed(2)}%`}{" "}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <center>
                      <img
                        alt="Loading"
                        src="https://developer.riotgames.com/static/img/katarina.55a01cf0560a.gif"
                      />
                    </center>
                  </td>
                </tr>
              )}
              {/* <tr>
          <td>3</td>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr> */}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({ params }) {
  const req = await fetch(
    `http://localhost:3000/api/get_sum?name=${params.Sname}`
  );

  const sdata = await req.json();

  const req2 = await fetch(
    `http://localhost:3000/api/get_range?rank_all=${sdata.rank_all}&level=${sdata.level}`
  );
  const tdata = await req2.json();

  return {
    props: { sdata, tdata },
  };
}

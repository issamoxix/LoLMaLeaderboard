import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ChampLadderTable from "../Champions/ChampLadderTable";
import Mcom from "../Mcom";
import champs from "../../../assets/quotes/test.json";
import SquareImg from "../Champions/SquareImg";
import styles from "../../../styles/Chamions/Choose.module.css";
import Head from "next/head";

import NasCom from "../NasCom";
import Infos from "../Infos";
function ChampLadder() {
  const [active, setActive] = useState(1);
  const [_data, setData] = useState();
  const [pages, setPages] = useState();
  const [inpt, setInpt] = useState();
  const [title, setTitle] = useState("Loading ...");
  const [icon, setIcon] = useState();
  const [loading, setLoading] = useState(false);
  const [em, setEm] = useState(false);
  const [intitre, setintitre] = useState("Add/Update");
  const { data } = champs;
  const router = useRouter();
  const { query } = router;
  const { index } = router.query || 1;
  const champId = query.chId;

  const get_Data = async (skip = 0, limite = 10) => {
    setData();
    setLoading(true);
    const res = await fetch(
      `/api/Champ?Cid=${champId}&code=0&skip=${skip}&limite=${limite}`
    );

    const json0 = await res.json();
    let json = json0.data;
    if (json.length == 0) {
      setEm(true);
    } else {
      setEm(false);
    }
    setData(json);
    setPages(
      (json0.ct / limite) % 1 == 0
        ? json0.ct / limite
        : parseInt(json0.ct / limite + 1)
    );
    console.log(pages);
    setLoading(false);
  };
  const lli = [];
  for (let i = 0; i < pages; i++) {
    lli.push(1);
  }
  const handleAdd = async () => {
    setintitre("Loading ...");
    const res = await fetch(`/api/Champ?name=${inpt}&ckey=${champId}&code=1`);
    const json = await res.json();
    const { done } = json;
    setintitre("Updated !");
    get_Data();
  };
  useEffect(() => {
    if (router.asPath == "/?page=CL") {
      router.push(`/?page=${"C"}`, undefined, { shallow: true });
    }
    for (let i in Object.keys(data)) {
      if (parseInt(data[Object.keys(data)[i]]["key"]) == parseInt(champId)) {
        setTitle(Object.keys(data)[i]);
        setIcon(data[Object.keys(data)[i]]["image"]["full"]);
        break;
      }
    }
    get_Data();
  }, [champId]);
  useEffect(() => {
    get_Data((index - 1) * 10);
    setActive(index);
  }, [index]);
  return (
    <>
      <Head>
        <title>Top {title} Moroccan Players </title>
        <meta
          name="image"
          content={`http://lolg-cdn.porofessor.gg/img/banners/champion-banners/${champId}.jpg`}
        />

        <meta property="og:title" content={`Top ${title} Moroccan Players `} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://lolma.vercel.app/" />
        <meta
          property="og:image"
          content={`http://lolg-cdn.porofessor.gg/img/banners/champion-banners/${champId}.jpg`}
        />

        <meta
          name="twitter:image"
          content={`http://lolg-cdn.porofessor.gg/img/banners/champion-banners/${champId}.jpg`}
        ></meta>

        {/* nprogress files */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossorigin="anonymous"
        />
      </Head>
      <NasCom>
        <Infos />
      </NasCom>
      <NasCom
        url={`http://lolg-cdn.porofessor.gg/img/banners/champion-banners/${champId}.jpg`}
      >
        <h3 className={styles.ChampTitle}>Register here</h3>
        <form
          className={styles.addForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <input
            type="text"
            value={inpt}
            onChange={(e) => setInpt(e.target.value)}
            placeholder="Summoner Name"
            className={styles.InputSum}
          />
          <button className={styles.subBtn}> {intitre} </button>
        </form>
      </NasCom>
      <Mcom>
        <ChampLadderTable
          loading={loading}
          data={_data}
          refresh={get_Data}
          em={em}
          active={active}
        />
        <div className={styles.pag}>
          <ul>
            {lli.map((d, key) => (
              <li
                onClick={() => {
                  router.push(
                    `/?page=CL&chId=${champId}&index=${key + 1}`,
                    undefined,
                    {
                      shallow: true,
                    }
                  );
                }}
                style={{
                  filter: parseInt(index) === key + 1 && "brightness(1)",
                }}
              >
                {" "}
                {key + 1}{" "}
              </li>
            ))}
          </ul>
        </div>
      </Mcom>
    </>
  );
}

export default ChampLadder;

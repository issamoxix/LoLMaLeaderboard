import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ChampLadderTable from "../Champions/ChampLadderTable";
import Mcom from "../Mcom";
import champs from "../../../assets/quotes/test.json";
import SquareImg from "../Champions/SquareImg";
import styles from "../../../styles/Chamions/Choose.module.css";

import NasCom from "../NasCom";
import Infos from "../Infos";
function ChampLadder() {
  const [_data, setData] = useState();
  const [inpt, setInpt] = useState();
  const [title, setTitle] = useState("Loading ...");
  const [icon, setIcon] = useState();
  const [loading, setLoading] = useState(false);
  const [em, setEm] = useState(false);
  const [intitre, setintitre] = useState("Add/Update");
  const { data } = champs;
  const router = useRouter();
  const { query } = router;
  const champId = query.chId;

  const get_Data = async () => {
    setData();
    setLoading(true);
    const res = await fetch(`/api/Champ?Cid=${champId}&code=0`);
    const json = await res.json();
    try {
      let { done } = json;
      if (done == "Empty") {
        setEm(true);
      }
    } catch {}
    if (json.done) {
      setData([]);
    } else {
      setEm(false);
      setData(json);
    }
    setLoading(false);
  };
  const handleAdd = async () => {
    setintitre("Loading ...");
    const res = await fetch(`/api/Champ?name=${inpt}&ckey=${champId}&code=1`);
    const json = await res.json();
    const { done } = json;
    setintitre(done);
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
  return (
    <>
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
        />
      </Mcom>
    </>
  );
}

export default ChampLadder;

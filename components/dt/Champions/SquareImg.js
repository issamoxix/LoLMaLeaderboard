import { useRouter } from "next/router";
import React from "react";
import styles from "../../../styles/Chamions/Choose.module.css";

function SquareImg({ ChampName, Cid }) {
  const router = useRouter();
  return (
    <div
      className={styles.ChampIconWrapper}
      onClick={() =>
        router.push(`/?page=CL&chId=${Cid}`, undefined, { shallow: true })
      }
    >
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/${ChampName}`}
        alt="Champion"
      />
      {/* http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/Aatrox.png */}
    </div>
  );
}

export default SquareImg;

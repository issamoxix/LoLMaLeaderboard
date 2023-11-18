import React, { useEffect, useState, ChangeEvent } from "react";
import IconsWrapper from "../Champions/IconsWrapper";
import SquareImg from "../Champions/SquareImg";
import Mcom from "../Mcom";
import styles from "../../../styles/Chamions/Choose.module.css";
import Head from "next/head";

interface ChampionData {
  [key: string]: {
    id: number;
    image: string;
    image_url: string;
  };
}

function Champions() {
  const [data, setData] = useState<ChampionData[]>([]);
  const [displayData, setDisplayData] = useState<ChampionData[]>([]);

  const handleFetching = async (query = ""): Promise<void> => {
    if (data.length > 10 && query.length > 2) {
      const filteredData = data.filter(item => Object.keys(item)[0].includes(query.toLowerCase()));
      setDisplayData(filteredData);
      return;
    }

    if (data.length > 10) {
      setDisplayData(data);
      return;
    }

    const res = await fetch(`/api/Champ?code=2&q=${query || ""}`);
    const json = await res.json();
    setData(json);
    setDisplayData(json);
  };

  useEffect(() => {
    handleFetching();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    if (inputValue.length >= 2) {
      handleFetching(inputValue);
    } else if (inputValue.length === 0) {
      handleFetching();
    }
  };

  return <>
    <Head>
      <title>Champions </title>
    </Head>
    <Mcom>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Search For Champion"
        style={{ marginBottom: "15px" }
        }
        className={styles.InputSum}
      />
      <IconsWrapper>
        {
          displayData.map((d, index) => {
            const valueOfObj = Object.values(d)[0];
            return <SquareImg key={index} ChampName={valueOfObj.image} Cid={valueOfObj.id} ImageUrl={valueOfObj.image_url} />;
          })
        }
      </IconsWrapper>
    </Mcom>
  </>
}

export default Champions;

import React, { useEffect, useState } from "react";
import IconsWrapper from "../Champions/IconsWrapper";
import SquareImg from "../Champions/SquareImg";
import Mcom from "../Mcom";
import styles from "../../../styles/Chamions/Choose.module.css";

function Champions() {
  const [data, setData] = useState([]);

  // const { data } = name;
  const handlefetching = async (query = "") => {
    const res = await fetch(`/api/Champ?code=2&q=${query || ""}`);
    const json = await res.json();
    setData(await json);
  };
  // const Items = [];
  // for (let i in data) {
  //   // let name = data[i].name.replace(" ", "").replace("'", "").replace(".", "");
  //   let name = data[i].name.replace(/[ '.]/g, "");

  //   Items.push(<SquareImg ChampName={name} />);
  // }

  // for (let i in Object.keys(data)) {
  //   let name = data[Object.keys(data)[i]]["image"]["full"];
  //   Items.push(
  //     <SquareImg ChampName={name} Cid={data[Object.keys(data)[i]]["key"]} />
  //   );
  // }
  useEffect(() => {
    handlefetching();
  }, []);
  return (
    <>
      <Mcom>
        {/* <IconsWrapper>{Items.map((d) => d)}</IconsWrapper> */}
        <input
          type="text"
          onChange={(e) => {
            if (e.target.value.length >= 2) {
              handlefetching(e.target.value);
            } else if (e.target.value.length == 0) {
              handlefetching();
            }
          }}
          placeholder="Search For Champion"
          style={{ marginBottom: "15px" }}
          className={styles.InputSum}
        />
        <IconsWrapper>
          {data &&
            data.map((d) => <SquareImg ChampName={d.image} Cid={d.id} />)}
        </IconsWrapper>
      </Mcom>
    </>
  );
}

export default Champions;

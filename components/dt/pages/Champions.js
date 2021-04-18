import React from "react";
import IconsWrapper from "../Champions/IconsWrapper";
import SquareImg from "../Champions/SquareImg";
import Mcom from "../Mcom";
import name from "../../../assets/quotes/test.json";
function Champions() {
  const { data } = name;

  const Items = [];
  // for (let i in data) {
  //   // let name = data[i].name.replace(" ", "").replace("'", "").replace(".", "");
  //   let name = data[i].name.replace(/[ '.]/g, "");

  //   Items.push(<SquareImg ChampName={name} />);
  // }

  for (let i in Object.keys(data)) {
    let name = data[Object.keys(data)[i]]["image"]["full"];
    Items.push(
      <SquareImg ChampName={name} Cid={data[Object.keys(data)[i]]["key"]} />
    );
  }
  return (
    <>
      <Mcom>
        <IconsWrapper>{Items.map((d) => d)}</IconsWrapper>
      </Mcom>
    </>
  );
}

export default Champions;

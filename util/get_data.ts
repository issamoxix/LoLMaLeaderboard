const https = require("https");
require('dotenv').config();
import { RiotApiUrlBuilder } from "./RiotApi/UrlBuilder"

const get_info = async (url): Promise<string> => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let dataString = "";

      res.on("data", (chunk) => {
        dataString += chunk;
      });

      res.on("end", () => {
        resolve(dataString);
      });
    }).on("error", (e) => {
      reject({
        error: "An error has occurred!" + e,
      });
    });
  });
};

type SummonerInfo = {
  id: string;
  profileIconId: number;
  summonerLevel: number;
  name: string;
  // Add other properties if needed
};

type RankInfo = {
  queueType: string;
  // Add other properties if needed
};

type ChampInfo = {
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  // Add other properties if needed
};


export default async function launch(Username: string, Champ = false, ChampKey = 0) {
  const key = process.env.API_KEY
  const urlBuilder = new RiotApiUrlBuilder("euw1", key)
  const summonerUrl: string = urlBuilder.buildSummonerUrl(Username)
  const infoString: string = await get_info(summonerUrl)
  let info: SummonerInfo = JSON.parse(infoString);


  const info_id = info.id;
  var icon = info.profileIconId;
  var level = info.summonerLevel;

  const rankUrl = urlBuilder.buildRankUrl(info.id);
  const infoAccountString: string = await get_info(rankUrl)
  let info_account: RankInfo[] = JSON.parse(infoAccountString);

  let flex = false;

  const soloQueueInfo = info_account.find((dt) => dt.queueType === "RANKED_SOLO_5x5");
  if (soloQueueInfo) {
    info_account = [soloQueueInfo];
  } else {
    flex = true;
  }




  const masteryUrl = urlBuilder.buildChampionMasteryUrl(info.id);
  const champInfoString: string = await get_info(masteryUrl)
  let champs_info: ChampInfo[] = JSON.parse(champInfoString);
  if (Champ) {
    for (const champ of champs_info) {
      if (champ.championId === ChampKey) {
        console.log({ name: info.name.toLowerCase(), icon, ...champ })
        return { name: info.name.toLowerCase(), icon, ...champ };
      }
    }
  }

  let in_case = [
    {
      summonerName: info.name,
      tier: "Unranked",
      rank: "",
      lp: 0,
      wins: 0,
      losses: 1,
    },
  ];

  return {
    data: flex ? in_case : info_account.length === 0 ? in_case : info_account,
    icon,
    level,
    champs_info: champs_info.slice(0, 3),
  };
}

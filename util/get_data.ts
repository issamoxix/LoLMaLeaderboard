const https = require("https");
require('dotenv').config();
import { RiotApiUrlBuilder } from "./RiotApi/UrlBuilder"
const champs_list = require("./champ.json");
const mgurl = process.env.MGURL || "mongodb://localhost:27017/";

const mongoCl = require("mongodb").MongoClient;

// url to get username id's
let url = (username, key): string =>
  `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${key}`;
// url2 to get user rank data
let url2 = (id, key) =>
  `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${key}`;

// get user champion mastery
let url3 = (u_id, key) =>
  `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${u_id}?api_key=${key}`;

let url4;
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
    // return await launch(Username);
  }



  if (Champ) {
    const masteryUrl = urlBuilder.buildChampionMasteryUrl(info.id);
    const champInfoString: string = await get_info(masteryUrl)
    let champs_info: ChampInfo[] = JSON.parse(champInfoString);

    for (const champ of champs_info) {
      if (champ.championId === ChampKey) {
        return { name: info.name.toLowerCase(), icon, ...champ };
      }
    }
  }
  // console.log(info_account);
  // console.log(champs_info.slice(0, 3));
  // let ch1 = champs_list[parseInt(champs_info[0].championId)];
  // let ch2 = champs_list[parseInt(champs_info[1].championId)];
  // let ch3 = champs_list[parseInt(champs_info[2].championId)];

  // champName with lvl

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
  };
}
// launch("wa team", true, 432).then((d) => {
//   console.log(d);
// });

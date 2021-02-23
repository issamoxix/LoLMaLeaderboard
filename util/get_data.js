const https = require("https");

const champs_list = require("./champ.json");
const mgurl = "mongodb://localhost:27017/";

const mongoCl = require("mongodb").MongoClient;

// url to get username id's
let url = (username, key) =>
  `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${key}`;
// url2 to get user rank data
let url2 = (id, key) =>
  `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${key}`;

// get user champion mastery
let url3 = (u_id, key) =>
  `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${u_id}?api_key=${key}`;

const get_info = async (url) => {
  let dataString = "";
  const response = await new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      res.on("data", (chunk) => {
        dataString += chunk;
      });
      res.on("end", () => {
        resolve(dataString);
      });
    });
    req.on("error", (e) => {
      reject({
        error: "Error has accured !",
      });
    });
  });
  return await response;
};
export default async function launch(Username) {
  var db = await mongoCl.connect(mgurl, { useUnifiedTopology: true });
  var dbo = db.db("lolrank");
  var akey = await dbo.collection("riot_api").find().toArray();
  var key = akey[0].key;
  db.close();
  let info = JSON.parse(await get_info(url(Username, key)));
  const info_id = info.id;
  var icon = info.profileIconId;
  var level = info.summonerLevel;
  let info_account = JSON.parse(await get_info(url2(info_id, key)));
  if (info_account.length !== 0) {
    info_account.map((dt) => {
      if (dt.queueType == "RANKED_SOLO_5x5") {
        info_account = [dt];
      }
    });
    if (info_account[0].queueType != "RANKED_SOLO_5x5") {
      console.log("Loading ...");
      return await launch(Username);
    }
  }
  let champs_info = JSON.parse(await get_info(url3(info.id, key)));
  // console.log(info_account);
  // console.log(champs_info.slice(0, 3));
  let ch1 = champs_list[parseInt(champs_info[0].championId)];
  let ch2 = champs_list[parseInt(champs_info[1].championId)];
  let ch3 = champs_list[parseInt(champs_info[2].championId)];
  let champs_mystery = {};
  // champName with lvl
  champs_mystery[ch1] = champs_info[0].championLevel;

  champs_mystery[ch2] = champs_info[1].championLevel;

  champs_mystery[ch3] = champs_info[2].championLevel;
  // champName with Mp
  champs_mystery[`${ch1}_sort`] = champs_info[0].championPoints;

  champs_mystery[`${ch2}_sort`] = champs_info[1].championPoints;

  champs_mystery[`${ch3}_sort`] = champs_info[2].championPoints;

  // champs_info[2].championPoints,
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
    data: info_account.length === 0 ? in_case : info_account,
    icon,
    level,
    champs_mystery,
  };
}

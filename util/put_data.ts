import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import launch from "./get_data";
import rankCalc from "./rank_cal";
import databaseHandler from "./db/database";

const encodeUtf8 = (s: string) => unescape(encodeURIComponent(s));


interface ChampionInfo {
  name: string;
  // Add other properties as needed
}

interface SummonerData {
  summonerName: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

interface UserData {
  name: string;
  tier: string;
  rank: string;
  rank_all: number;
  lp: number;
  icon: string; // Assuming it's a string, update the type accordingly
  level: number; // Assuming it's a number, update the type accordingly
  W: number;
  L: number;
  champsInfo: ChampionInfo[];
}

async function putData(req: any, res: any, next: any) {
  try {
    const client: MongoClient = await databaseHandler()
    const db = client.db("lolrank");

    const summonerName: string = encodeUtf8(req.query.name);
    const data: any = await launch(summonerName);
    const _data: SummonerData = data.data[0];

    const obj: UserData = {
      name: _data.summonerName?.toLowerCase(),
      tier: _data.tier,
      rank: _data.rank,
      rank_all: rankCalc(_data.tier, _data.rank, _data.leaguePoints || 0),
      lp: _data.leaguePoints,
      icon: data.icon,
      level: data.level,
      W: _data.wins,
      L: _data.losses,
      champsInfo: data.champs_info
    };

    const existingSummoner = await db.collection("users").findOne({ name: obj.name });

    if (existingSummoner) {
      await db.collection("users").updateOne({ name: obj.name }, { $set: obj });
      res.json({ done: "Refreshed" });
    } else {
      await db.collection("users").insertOne(obj);
      // TODO: Put this back
      // if (obj.champsInfo.length > 0){
      //   await Promise.all(obj.champsInfo.map(async (champ: ChampionInfo) => {
      //     await db.collection("Champs").insertOne({ name: obj.name, icon: obj.icon, ...champ });
      //   }));
      // }

      res.json({ done: "Added" });
    }
  } catch (error) {
    console.error("Error processing data:", error);
    await res.json({ error });
  } finally {
    next();
  }
}

const middleware = nextConnect();
middleware.use(putData);

export default middleware;

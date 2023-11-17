import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import launch from "./get_data";
import rankCalc from "./rank_cal";
import dotenv from 'dotenv';

dotenv.config();

const encodeUtf8 = (s) => unescape(encodeURIComponent(s));

const url = process.env.MGURL || "mongodb://localhost:27017/";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function putData(req, res, next) {
  try {
    if (!client.isConnected()) await client.connect();
    const db = await client.db("lolrank");

    const summonerName = encodeUtf8(req.query.name);
    const data = await launch(summonerName);
    const _data = data.data[0];

    const obj = {
      name: _data.summonerName && _data.summonerName.toLowerCase(),
      tier: _data.tier,
      rank: _data.rank,
      rank_all: rankCalc(_data.tier, _data.rank, parseInt(_data.leaguePoints)),
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
      if (obj.champsInfo.length > 0){
        obj.champsInfo.map(async (champ)=> { 
          await db.collection("Champs").insertOne({name:obj.name,icon:obj.icon, ...champ})
        })
      }
      res.json({ done: "Added" });
    }

  } catch (error) {
    console.error("Error processing data:", error);
    await res.json({ error: error })
  } finally {
    next();
  }
}

const middleware = nextConnect();
middleware.use(putData);

export default middleware;

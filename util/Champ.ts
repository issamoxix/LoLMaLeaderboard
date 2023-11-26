import nextConnect from "next-connect";
import launch from "./get_data";
import championList from "./champ.json";
import databaseHandler from "./db/database";

// Enums
enum ResponseCode {
  GetChampionList = 2,
  UpdateChampion = 1,
  GetChampionDetails = 0,
  Default = -1,
}

enum CacheControlHeaders {
  MaxAge = 1800,
  StaleWhileRevalidate = 59,
}

async function insertChamp(req, res, next) {
  const client = await databaseHandler();
  let db = await client.db("lolrank");

  const handleGetChampionList = async () => {
    res.setHeader(
      'Cache-Control',
      `public, s-maxage=${CacheControlHeaders.MaxAge}, max-age=${CacheControlHeaders.MaxAge}, stale-while-revalidate=${CacheControlHeaders.StaleWhileRevalidate}`
    );
    await res.json(championList);
  };

  const handleUpdateChampion = async () => {
    if (!req.query.name) {
      res.json({ done: "name not provided" });
      return;
    }

    try {
      const encodedName = decodeURIComponent(req.query.name as string);
      const shouldUpdate = true;
      const ckey = parseInt(req.query.ckey);
      const data:any = await launch(encodedName, shouldUpdate, ckey);

      const existingChamps = await db.collection("Champs").find({
        championId: data.championId,
        name: data.name,
      }).toArray();

      if (existingChamps.length !== 0) {
        await db.collection("Champs").updateOne(
          { championId: data.championId, name: data.name },
          { $set: data }
        );
        res.json({ done: "Refreshed" });
      } else {
        await db.collection("Champs").insertOne(data);
        res.json({ done: "Added" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const handleGetChampionDetails = async () => {
    const cId = parseInt(req.query.Cid);
    console.log(req.query)
    const ct = await client
      .db("lolrank")
      .collection("Champs")
      .find({ championId: cId }, { $exists: true })
      .count();

    db = await client
      .db("lolrank")
      .collection("Champs")
      .find({ championId: cId }, { $exists: true })
      .limit(parseInt(req.query.limite))
      .skip(req.query.skip ? parseInt(req.query.skip) : 0)
      .sort({ championPoints: -1 })
      .toArray();
    res.json({ data: db, ct: ct });
  };

  const handleDefault = () => {
    res.json({ salam: "wsalam" });
  };

  const responseCode = parseInt(req.query.code);
  switch (responseCode) {
    case ResponseCode.GetChampionList:
      await handleGetChampionList();
      break;
    case ResponseCode.UpdateChampion:
      await handleUpdateChampion();
      break;
    case ResponseCode.GetChampionDetails:
      await handleGetChampionDetails();
      break;
    default:
      handleDefault();
  }

  return next();
}

const middleware = nextConnect();
middleware.use(insertChamp);
export default middleware;

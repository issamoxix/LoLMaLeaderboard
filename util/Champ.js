import nextConnect from "next-connect";
import launch from "./get_data";
import championList from "./champ.json";
import databaseHandler from "./db/database";

const encode_utf8 = (s) => unescape(encodeURIComponent(s));

async function insertchamp(req, res, next) {
  if (parseInt(req.query.code) == 2) {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1800,max-age=1800, stale-while-revalidate=59'
    )
    await res.json(championList)
  }
  const client = await databaseHandler()
  let db = await client.db("lolrank");

  if (parseInt(req.query.code) == 1) {
    if (!req.query.name) {
      res.json({ done: "name not provided" });
    }
    try {

      const encodedName = encode_utf8(req.query.name);
      const shouldUpdate = true;
      const ckey = parseInt(req.query.ckey);
      const data = await launch(encodedName, shouldUpdate, ckey);

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
    
  } else if (parseInt(req.query.code) == 0) {
    let cId = parseInt(req.query.Cid);
    req.ct = await client
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
    res.json({ data: db, ct: req.ct })
  } else {
    res.json({ salam: "wsalam" });
  }

  return next();
}
const middleware = nextConnect();
middleware.use(insertchamp);
export default middleware;

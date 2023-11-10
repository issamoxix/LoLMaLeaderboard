import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import launch from "./get_data";
import rank_calc from "./rank_cal";
import insert_data from "./redis_db";
require('dotenv').config();

const url = process.env.MGURL || "mongodb://localhost:27017/";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function insertchamp(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
  }
  req.db = client.db("lolrank");
  if (parseInt(req.query.code) == 1) {
    if (!req.query.name) {
      res.json({ done: "Name ?!" });
    }
    launch(encode_utf8(req.query.name), true, parseInt(req.query.ckey)).then(
      (data) => {
        req.db
          .collection("Champs")
          .find(
            { championId: data.championId, name: data.name },
            { $exists: true }
          )
          .toArray((e, doc) => {
            if (e) throw e;
            if (doc.length != 0) {
              req.db
                .collection("Champs")
                .updateOne(
                  { championId: data.championId, name: data.name },
                  { $set: data },
                  (o, d) => {
                    if (o) throw o;
                    res.json({ done: "Refreshed" });
                  }
                );
            } else {
              req.db.collection("Champs").insertOne(data, (error, rex) => {
                if (error) throw error;

                res.json({ done: "Added" });
              });
            }
          });
      }
    );
  } else if (parseInt(req.query.code) == 0) {
    let cId = parseInt(req.query.Cid);
    req.ct = await client
      .db("lolrank")
      .collection("Champs")
      .find({ championId: cId }, { $exists: true })
      .count();
    req.db = await client
      .db("lolrank")
      .collection("Champs")
      .find({ championId: cId }, { $exists: true })
      .limit(parseInt(req.query.limite))
      .skip(req.query.skip ? parseInt(req.query.skip) : 0)
      .sort({ championPoints: -1 })
      .toArray();
    res.json({ data: req.db, ct: req.ct})
  } else if (parseInt(req.query.code) == 2) {
    req.db
      .collection("ChampionList")
      .find(
        { name: { $regex: new RegExp(req.query.q, "i") } },
        { $exists: true }
      )

      .toArray((e, doc) => {
        if (e) throw e;
        if (doc.length != 0) {
          res.json(doc);
        } else {
          res.json([]);
        }
      });
  } else {
    res.json({ salam: "wsalam" });
  }

  return next();
}
const middleware = nextConnect();
middleware.use(insertchamp);
export default middleware;

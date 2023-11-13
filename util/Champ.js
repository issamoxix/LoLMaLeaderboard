import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import launch from "./get_data";
import fs from "fs/promises";
import championList from "./champ.json";
require('dotenv').config();

const encode_utf8 = (s) => unescape(encodeURIComponent(s));
const url = process.env.MGURL || "mongodb://localhost:27017/";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function insertchamp(req, res, next) {
  if (!client.isConnected()) await client.connect();
  let db = await client.db("lolrank");

  if (parseInt(req.query.code) == 1) {
    if (!req.query.name) {
      res.json({ done: "name not provided" });
    }

    launch(encode_utf8(req.query.name), true, parseInt(req.query.ckey)).then(
      (data) => {
        db
          .collection("Champs")
          .find(
            { championId: data.championId, name: data.name },
            { $exists: true }
          )
          .toArray((e, doc) => {
            if (e) throw e;
            if (doc.length != 0) {
              db
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
              db.collection("Champs").insertOne(data, (error, rex) => {
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
    db = await client
      .db("lolrank")
      .collection("Champs")
      .find({ championId: cId }, { $exists: true })
      .limit(parseInt(req.query.limite))
      .skip(req.query.skip ? parseInt(req.query.skip) : 0)
      .sort({ championPoints: -1 })
      .toArray();
    res.json({ data: db, ct: req.ct })
  } else if (parseInt(req.query.code) == 2) {

    await res.json(championList)
  } else {
    res.json({ salam: "wsalam" });
  }

  return next();
}
const middleware = nextConnect();
middleware.use(insertchamp);
export default middleware;

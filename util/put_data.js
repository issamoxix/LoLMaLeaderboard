import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import launch from "./get_data";
import rank_calc from "./rank_cal";
import insert_data from "./redis_db";

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function put_data(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
  }
  req.db = client.db("lolrank");
  launch(encode_utf8(req.query.name)).then((data) => {
    let _data = data.data[0];
    // console.log(encode_utf8(req.query.name));
    console.log(_data.summonerName);

    var obj = {
      name: _data.summonerName && _data.summonerName.toLowerCase(),
      tier: _data.tier,
      rank: _data.rank,
      rank_all: rank_calc(_data.tier, _data.rank, parseInt(_data.leaguePoints)),
      lp: _data.leaguePoints,
      icon: data.icon,
      level: data.level,
      W: _data.wins,
      L: _data.losses,
      ...data.champs_mystery,
    };
    insert_data(encode_utf8(req.query.name), obj.rank_all, obj.level);
    req.db
      .collection("users")
      .find(
        { name: _data.summonerName && _data.summonerName.toLowerCase() },
        { $exists: true }
      )
      .toArray((e, doc) => {
        if (e) throw e;
        if (doc.length != 0) {
          console.log("exists !!");
          console.log(obj);
          console.log("Name here => ", _data.summonerName);
          req.db
            .collection("users")
            .updateOne({ name: _data.summonerName }, { $set: obj }, (o, d) => {
              if (o) throw o;
              console.log("Refreshed Succ");

              res.json({ done: "Refreshed" });
            });
        } else {
          console.log('doesn"t exits');
          req.db.collection("users").insertOne(obj, (error, rex) => {
            if (error) throw error;
            console.log("added Succ ");

            res.json({ done: "Added" });
          });
        }
      });
  });

  return next();
}
const middleware = nextConnect();
middleware.use(put_data);
export default middleware;

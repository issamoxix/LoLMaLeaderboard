import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import launch from "./get_data";
import rank_calc from "./rank_cal";
// const url ="mongodb+srv://admin1:issamroot123@lolma.aan0s.mongodb.net/users?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function put_data(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;

  req.db = client.db("lolrank");
  launch(req.query.name).then((data) => {
    let _data = data.data[0];
    console.log(_data.summonerName);

    var obj = {
      name: _data.summonerName,
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

    req.db
      .collection("users")
      .find({ name: _data.summonerName }, { $exists: true })
      .toArray((e, doc) => {
        if (e) throw e;
        if (doc.length != 0) {
          console.log("exists !!");
          req.db
            .collection("users")
            .updateOne({ name: _data.summonerName }, { $set: obj }, (o, d) => {
              if (o) throw o;
            });
        } else {
          console.log('doesn"t exits');
          req.db.collection("users").insertOne(obj, (error, res) => {
            if (error) throw error;
            console.log("added Succ ");
          });
        }
      });
  });
  return next();
}
const middleware = nextConnect();
middleware.use(put_data);
export default middleware;

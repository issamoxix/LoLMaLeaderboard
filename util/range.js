// name , icon , rank , tier , level
import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

// const url ="mongodb+srv://admin1:issamroot123@lolma.aan0s.mongodb.net/users?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  if (parseInt(req.query.rank_all) > 0) {
    req.db = client
      .db("lolrank")
      .collection("users")
      .find({ rank_all: { $lte: parseInt(req.query.rank_all) } })
      .sort({ rank_all: -1, level: -1 })
      .limit(5)
      .toArray();
  } else if (parseInt(req.query.rank_all) === 0) {
    req.db = client
      .db("lolrank")
      .collection("users")
      .find({ level: { $lte: parseInt(req.query.level) } })
      .sort({ rank_all: -1, level: -1 })
      .limit(5)
      .toArray();
  }

  return next();
}
const middleware = nextConnect();
middleware.use(database);
export default middleware;

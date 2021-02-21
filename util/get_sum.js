// name , icon , rank , tier , level
import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import get_ladder from "./redis_get_rank";
// const url ="mongodb+srv://admin1:issamroot123@lolma.aan0s.mongodb.net/users?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const redis = require("redis");

const rclient = redis.createClient();
rclient.on("error", function (error) {
  console.log(error);
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;

  req.db = client
    .db("lolrank")
    .collection("users")
    .find({ name: req.query.name && req.query.name.toLowerCase() })
    .toArray();

  rclient.ZREVRANK(
    ["lolrank", req.query.name && req.query.name.toLowerCase()],
    (e, r) => {
      // res.json({ Mrank: r, ...doc });
      req.ln = r + 1;

      return r;
    }
  );

  return next();
}
const middleware = nextConnect();
middleware.use(database);
export default middleware;

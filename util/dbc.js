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

  req.db = client
    .db("lolrank")
    .collection("users")
    .find()
    .limit(parseInt(req.query.limite))
    .skip(req.query.skip ? parseInt(req.query.skip) : 0)
    .sort({ rank_all: -1, level: -1 })
    .toArray();
  req.ct = client.db("lolrank").collection("users").count();
  return next();
}
const middleware = nextConnect();
middleware.use(database);
export default middleware;

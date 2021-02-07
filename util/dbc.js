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
    .sort({ rank_all: -1 })
    .toArray();
  return next();
}
const middleware = nextConnect();
middleware.use(database);
export default middleware;

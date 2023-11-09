import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
require('dotenv').config();
// const url ="mongodb+srv://admin1:issamroot123@lolma.aan0s.mongodb.net/users?retryWrites=true&w=majority";
const url = process.env.MGURL || "mongodb://localhost:27017/";
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



async function ttt(req, res, next) {
    if (!client.isConnected()) await client.connect();
    await res.status(200).json({
        "test": `test the ${url}`,
        "body2": await client.db("lolrank")
            .collection("users")
            .find()
            .sort({ rank_all: -1, level: -1 })
            .limit(5)
            .toArray()
    })
    return next();
}
const middleware = nextConnect();
middleware.use(ttt);

export default middleware;

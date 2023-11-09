import { MongoClient, ServerApiVersion  } from "mongodb";
import nextConnect from "next-connect";
require('dotenv').config();
// const url ="mongodb+srv://admin1:issamroot123@lolma.aan0s.mongodb.net/users?retryWrites=true&w=majority";
const url = process.env.MGURL || "mongodb://localhost:27017/";
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function ttt(req, res, next) {
    let body;
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        body = await client.db("lolrank")
            .collection("users")
            .find()
            .sort({ rank_all: -1, level: -1 })
            .limit(5)
            .toArray()
    } catch (err) {
        body = err.message
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    await res.status(200).json({
        "test": `test the ${url}`,
        "body": body
    })
    return next();
}
const middleware = nextConnect();
middleware.use(ttt);

export default middleware;

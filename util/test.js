import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
require('dotenv').config();
// const url ="mongodb+srv://admin1:issamroot123@lolma.aan0s.mongodb.net/users?retryWrites=true&w=majority";
const url = process.env.MGURL || "mongodb://localhost:27017/";

async function ttt(req, res, next) {
    res.status(200).json({
        "test":`test the ${url}`
    })
  return next();
}
const middleware = nextConnect();
middleware.use(ttt);
export default middleware;

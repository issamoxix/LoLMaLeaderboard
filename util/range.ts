import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import databaseHandler from "./db/database";
import { MongoClient } from "mongodb";


interface UserData {
  rank_all: number;
  level: number;
}

async function insertUserData(req: NextApiRequest, res: NextApiResponse, next: any) {
  try {
    const client: MongoClient = await databaseHandler()

    let db: UserData[] = [];

    if (parseInt(req.query.rank_all as string) > 0) {
      db = await client
        .db("lolrank")
        .collection("users")
        .find({ rank_all: { $lte: parseInt(req.query.rank_all as string) } })
        .sort({ rank_all: -1, level: -1 })
        .limit(5)
        .toArray();
    } else if (parseInt(req.query.rank_all as string) === 0) {
      db = await client
        .db("lolrank")
        .collection("users")
        .find({ level: { $lte: parseInt(req.query.level as string) } })
        .sort({ rank_all: -1, level: -1 })
        .limit(5)
        .toArray();
    }

    res.json(db);

  } catch (error) {
    console.error("Error fetching data:", error);
    res.json({ error });
  } finally {
    next();
  }
}

const middleware = nextConnect();
middleware.use(insertUserData);

export default middleware;

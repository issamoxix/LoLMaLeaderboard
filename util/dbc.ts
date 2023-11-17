import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl: string = process.env.MGURL || "mongodb://localhost:27017/";
const databaseClient: MongoClient = new MongoClient(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

interface UserData {
  rank_all: number;
  level: number;
}

async function databaseHandler(req: NextApiRequest, res: NextApiResponse, next: any) {
  try {
    if (!databaseClient.isConnected()) await databaseClient.connect();

    const usersData: UserData[] = await databaseClient
      .db("lolrank")
      .collection("users")
      .find()
      .limit(parseInt(req.query.limit as string))
      .skip(req.query.skip ? parseInt(req.query.skip as string) : 0)
      .sort({ rank_all: -1, level: -1 })
      .toArray();

    const usersCount: number = await databaseClient.db("lolrank").collection("users").count();

    res.json({
      data: usersData,
      count: usersCount,
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    res.json({ error });
  } finally {
    next();
  }
}

const databaseMiddleware = nextConnect();
databaseMiddleware.use(databaseHandler);

export default databaseMiddleware;

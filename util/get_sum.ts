import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv';

dotenv.config();

const url: string = process.env.MGURL || "mongodb://localhost:27017/";
const client: MongoClient = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

interface UserData {
  name: string;
  icon: string;
  rank: string;
  tier: string;
  level: number;
  // Add other properties as needed
}

async function databaseHandler(req: NextApiRequest, res: NextApiResponse, next: any) {
  try {
    if (!client.isConnected()) await client.connect();

    const usersData: UserData[] = await client
      .db("lolrank")
      .collection("users")
      .find({ name: req.query.name && String(req.query.name).toLowerCase() })
      .toArray();

    res.json({ ...(usersData[0] || {}) });

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

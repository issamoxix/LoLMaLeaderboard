import { MongoClient } from "mongodb";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import databaseHandler from "./db/database";

interface UserData {
  name: string;
  icon: string;
  rank: string;
  tier: string;
  level: number;
  // Add other properties as needed
}

async function getSummonerData(req: NextApiRequest, res: NextApiResponse, next: any) {
  try {
    const client: MongoClient = await databaseHandler()

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
databaseMiddleware.use(getSummonerData);

export default databaseMiddleware;

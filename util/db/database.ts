import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

async function databaseHandler(): MongoClient {
    const url: string = process.env.MGURL || "mongodb://localhost:27017/";
    const client: MongoClient = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    if (!client.isConnected()) await client.connect();

    return client
}

export default databaseHandler
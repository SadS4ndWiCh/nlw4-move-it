import { MongoClient, Db } from 'mongodb';

let cachedClient: any = null;
let cachedDb: Db = null;

export async function connectToDatabase() {
  if(cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };
  const uri = process.env.MONGODB_URI;

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
    j: true,
  });

  const dbName = new URL(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;
  
  return { client, db };
}
import { MongoClient, ServerApiVersion } from 'mongodb';

//reusable function
export default async function dbConnect(collectionName) {
    const uri = process.env.MONGODB_URI;
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    return client.db(process.env.DB_NAME).collection(collectionName)
}


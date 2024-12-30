import { MongoClient, ServerApiVersion, WithId, Document } from "mongodb";
const USER = process.env.MONGOUSER;
const PASS = process.env.MONGOPASS;

const uri = `mongodb+srv://${USER}:${PASS}@cluster0.e0hp7vj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export async function testMongo() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log(`Error: ${error}`);
    } finally {
        await client.close();
    }
}

export async function getTasksData() {
    let result: WithId<Document>[] | undefined = undefined;
    try {
        await client.connect();
        const dbo = client.db("PersonalHub");
        result = await dbo.collection("Tasks").find({}).toArray();
    } catch (error) {
    } finally {
        await client.close();
    }
    return result;
}

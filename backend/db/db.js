require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getWord(client) {
    const collection = client.db("SWEdle").collection("words");
    const result = await collection.aggregate([
        { $sample: { size: 1 } }
    ]).toArray();

    if (result.length) {
        console.log("Found a random word:", result[0].word);
        return result[0].word; // Assuming the document has a 'word' field
    } else {
        console.log("No words found");
        return null;
    }
}


async function run() {
  try {
    await client.connect();

  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

module.exports = { client, listDatabases, getWord };

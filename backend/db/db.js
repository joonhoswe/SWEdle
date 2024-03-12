async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    // Do not close the client immediately; keep it open for incoming requests
  } catch (e) {
    console.error(e);
  }
}

run().catch(console.dir);

async function getWord(client) {
  try {
      const collection = client.db("SWEdle").collection("words");
      const result = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
      if (result.length) {
          console.log("Found a random word:", result[0].word);
          return result[0].word;
      } else {
          console.log("No words found");
          return null;
      }
  } catch (e) {
      console.error("Error fetching word from database:", e);
      throw new Error("Error retrieving word"); // Throw a new error to be caught by the caller
  }
}

module.exports = { getWord };

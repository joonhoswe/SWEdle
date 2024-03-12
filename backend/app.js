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


const express = require('express');
const path = require('path');
const { getWord } = require('./db/db')
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

app.get('/random-word', async (req, res) => {
  try {
      const word = await getWord(); // No need to pass the client here
      if (word) {
          res.json({ word });
      } else {
          res.status(404).send('No words found');
      }
  } catch (e) {
      console.error(e);
      res.status(500).send('Error retrieving a random word');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


module.exports = app;

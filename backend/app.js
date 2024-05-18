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
const app = express();

const path = require('path');
const { getWord } = require('./db/db')

const cors = require('cors');
// Array of allowed origins for CORS
const allowedOrigins = [
  'https://main--swedle.netlify.app',
  'https://swedle.netlify.app',
  'http://localhost:3000', 
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
};

app.use(cors(corsOptions));

app.get('/random-word', async (req, res) => {
  try {
      const word = await getWord(client); 
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

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;

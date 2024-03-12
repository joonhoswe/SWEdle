const express = require('express');
const path = require('path');
const { getWord } = require('./db/db')

const app = express();
const port = 3000;

app.get('/random-word', async (req, res) => {
  try {
      const word = await getWord(client); // Make sure to pass the MongoDB client
      if (word) {
          res.json({ word: word });
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

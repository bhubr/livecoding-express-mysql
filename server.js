const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const connection = require('./connection');

const app = express();

app.get('/students', (req, res) => {
  connection.query('SELECT * from student', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({
        error: err.message
      });
    } else {
      res.json(results);
    }
  });
});

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
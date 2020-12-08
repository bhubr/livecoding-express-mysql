const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const connection = require('./connection');

connection.query('SELECT * from student', (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.log(results);
  }
});

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
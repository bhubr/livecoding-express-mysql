const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
const express = require('express');
require('dotenv').config();
const studentsRouter = require('./routes/students');
const testRouter = require('./routes/test');

const app = express();


// Doit être ajouté à partir du moment où veut
// traiter des corps de requête en JSON
// Si vous l'oubliez, req.body = undefined
app.use(express.json());

// "Plug" students router AFTER enabling express.json()
// otherwise it won't be able to handle incoming JSON data
app.use('/api/students', studentsRouter);
app.use('/test', testRouter);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
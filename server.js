const express = require('express');
const { port } = require('./config');
const apiRouter = require('./routes');

const app = express();


// Doit être ajouté à partir du moment où veut
// traiter des corps de requête en JSON
// Si vous l'oubliez, req.body = undefined
app.use(express.json());

// "Plug" students router AFTER enabling express.json()
// otherwise it won't be able to handle incoming JSON data
app.use('/api', apiRouter);

app.listen(port, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const connection = require('./connection');

const app = express();

// Doit être ajouté à partir du moment où veut
// traiter des corps de requête en JSON
// Si vous l'oubliez, req.body = undefined
app.use(express.json());

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

app.post('/students', (req, res) => {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const birthday = req.body.birthday
  const address = req.body.address
  const num_courses = req.body.num_courses
  const sql = `INSERT INTO
    student(firstname, lastname, birthday, address, num_courses)
    VALUES('${firstname}', '${lastname}', '${birthday}', '${address}', ${num_courses})`
  connection.query(sql, (err, status) => {
    if (err) {
      console.error(err);
      res.status(500).send({
        error: err.message
      });
    } else {
      const id = status.insertId;
      const newStudent = { id, ...req.body };
      res.json(newStudent);
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
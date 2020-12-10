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

app.get('/students/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const sql = 'SELECT * from student WHERE id = ?';
  connection.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({
        error: err.message
      });
    } else if (results.length === 0) {
      res.status(404).send({
        error: 'Student not found'
      });
    } else {
      res.json(results[0]);
    }
  });
});

app.post('/students', (req, res) => {
  const {
    firstname, lastname, birthday, address, num_courses
  } = req.body;
  const sql = `INSERT INTO
    student(firstname, lastname, birthday, address, num_courses)
    VALUES(?, ?, ?, ?, ?)`
  connection.query(
    sql,
    [firstname, lastname, birthday, address, num_courses],
    (err, status) => {
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
    }
  );
});

app.put('/students/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const {
    firstname, lastname, birthday, address, num_courses
  } = req.body;
  const sql = `UPDATE student SET
    firstname = ?,
    lastname = ?,
    birthday = ?,
    address = ?,
    num_courses = ?
    WHERE id = ?
  `;
  connection.query(
    sql,
    [firstname, lastname, birthday, address, num_courses, studentId],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({
          error: err.message
        });
      } else {
        const updatedStudent = { id: studentId, ...req.body };
        res.json(updatedStudent);
      }
    }
  );
});

app.delete('/students/:id', (req, res) => {
  const studentId = Number(req.params.id);
  const sql = 'DELETE FROM student WHERE id = ?';
  connection.query(
    sql,
    [studentId],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({
          error: err.message
        });
      } else {
        res.sendStatus(204);
      }
    }
  );
});

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
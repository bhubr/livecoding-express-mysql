// get the client
const mysql = require('mysql2');
const { database } = require('./config');

// create the connection to database
const connection = mysql.createConnection(database);

module.exports = connection;

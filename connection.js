// get the client
const mysql = require('mysql2/promise');

const connectionWrapper = {
  connection: null,
  async createConnection() {
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS
    });
  },
  query(...args) {
    return this.connection.query(...args)
      .then(([results]) => results)
  }
}

connectionWrapper.createConnection()

module.exports = connectionWrapper;

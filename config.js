require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
  }
}
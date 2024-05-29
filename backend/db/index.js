const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432 // Default PostgreSQL port
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL: ', err.stack);
  } else {
    console.log('Connected to PostgreSQL at:', res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
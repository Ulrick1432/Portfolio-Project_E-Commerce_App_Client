const express = require('express');
const { Pool } = require('pg');
require('dotenv').config()

const app = express();


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

// Define routes
app.get('/', (req, res) => {
  res.send(`This is my first env example usage → ${process.env.S3_BUCKET} = ` + '${process.env.S3_BUCKET}');
});

// Start the server!
const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`${process.env.S3_BUCKET}`);
});
const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'your database name!',
  password: 'postgres',
  port: 5432 // Default PostgreSQL port
});

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World this is my first test');
});

// Start the server!
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
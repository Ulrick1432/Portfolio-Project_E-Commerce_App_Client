const express = require('express');
const session = require('express-session');
const app = express();
const db = require('./db');

const userRoutes = require('./Routes/user');

// Middleware to parse JSON request bodies (if not used 'reg.body' would be undefined)
app.use(express.json());

// Creates a session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use('/', userRoutes);

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
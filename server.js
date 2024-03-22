//Server.js 
const express = require('express');
const session = require('express-session');
const app = express();
const db = require('./db');
const passport = require('./config/passport');

const userRoutes = require('./Routes/user');
const authRoutes = require('./Routes/userAuth');


// Middleware to parse JSON request bodies (if not used 'reg.body' would be undefined)
app.use(express.json());

// Creates a session middleware
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

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRoutes);

app.use('/', authRoutes);

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
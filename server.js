//Server.js 
const express = require('express');
const session = require('express-session');
const app = express();
const passport = require('./config/passport');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/userAuth');
const productRoutes = require('./routes/product');
const cartsRoutes = require('./routes/carts');
const ordersRoutes = require('./routes/order');


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

//Setup Routes
app.use('/', userRoutes);

app.use('/', authRoutes);

app.use('/', productRoutes);

app.use('/cart', cartsRoutes);

app.use('/order', ordersRoutes);

// Define routes this is the frontpage/mainpage
app.get('/', (req, res) => {
  res.send(`This is my first env example usage → ${process.env.S3_BUCKET} = ` + '${process.env.S3_BUCKET}');
});

// Start the server!
const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`${process.env.S3_BUCKET}`);
});
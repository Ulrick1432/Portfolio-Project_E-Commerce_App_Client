const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

module.exports = (app) => {

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors({
    origin: [process.env.FRONTEND_ENDPOINT, process.env.API_ENDPOINT ],
    credentials: true,
  }));

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  // Creates a session
  app.use(
    session({  
      name: "UPH first session",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  );

  return app;
}

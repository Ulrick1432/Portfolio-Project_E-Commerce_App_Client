/**
 * Express Loader
 * 
 * Configures core Express middleware including CORS, body parsing, and session management.
 * This is the central place for application-wide middleware setup.
 * 
 * @module loaders/express
 */

const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

/**
 * Configures and applies Express middleware to the application.
 * 
 * Middleware applied in order:
 *   1. CORS - Cross-Origin Resource Sharing
 *   2. Body Parser JSON - Parse JSON request bodies
 *   3. URL Encoded Parser - Parse URL-encoded form data
 *   4. Session - Server-side session management with cookies
 * 
 * @param {Object} app - The Express application instance
 * @returns {Object} The configured Express application
 * 
 * @example
 * // In backend/index.js
 * const app = express();
 * const loaders = require('./loaders');
 * loaders.express(app);
 */
module.exports = (app) => {

  /**
   * CORS Middleware
   * Enables Cross-Origin Resource Sharing to allow requests from specified origins.
   * 
   * Configured origins:
   *   - FRONTEND_ENDPOINT: Local development (http://localhost:3000)
   *   - API_ENDPOINT: API server endpoint
   *   - FRONTEND_LOCAL_NETWORK_ENDPOINT: Local network access (http://192.168.x.x:3000)
   * 
   * @param {string[]} origin - Array of allowed origin URLs
   * @param {boolean} credentials - Allow cookies to be sent cross-origin
   */
  app.use(cors({
    origin: [
      process.env.FRONTEND_ENDPOINT, 
      process.env.API_ENDPOINT, 
      process.env.FRONTEND_LOCAL_NETWORK_ENDPOINT
    ],
    credentials: true,
  }));

  /**
   * JSON Body Parser
   * Parses incoming requests with JSON Content-Type header.
   * Transforms the raw JSON string in req.body into a JavaScript object.
   */
  app.use(bodyParser.json());

  /**
   * URL Encoded Body Parser
   * Parses incoming requests with URL-encoded form data (application/x-www-form-urlencoded).
   * 
   * @param {boolean} extended - Use qs library for parsing (allows rich objects/arrays)
   */
  app.use(bodyParser.urlencoded({ extended: true }));

  /**
   * Session Middleware
   * Creates server-side sessions to maintain state across HTTP requests.
   * Session data is stored server-side, with a session ID stored in a cookie on the client.
   * 
   * Session Options:
   *   - name: Cookie name for session ID ('uph_first_session')
   *   - secret: Secret key for signing session IDs (from env variables)
   *   - resave: Don't save session if unmodified
   *   - saveUninitialized: Don't save empty sessions
   *   - cookie: Cookie configuration
   * 
   * Cookie Settings:
   *   - secure: HTTPS-only cookie (false for development)
   *   - maxAge: 24 hours in milliseconds
   *   - sameSite: 'lax' - Cookie sent on same-origin requests only
   * 
   * @see https://github.com/expressjs/session
   */
  app.use(
    session({  
      name: "uph_first_session",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax'
      }
    })
  );

  return app;
};

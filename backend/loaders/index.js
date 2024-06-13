const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');

module.exports = async (app) => {

  // Load Express middlewares
  const expressApp = await expressLoader(app);

  // Load Passport middleware
  const passport = await passportLoader(expressApp);

  // Load API route handlers
  await routeLoader(app, passport);
  
  // Error-handling middleware
  app.use((err, req, res, next) => {

    const { message, status = 500 } = err;
  
    return res.status(status).send({ message });
  });
}
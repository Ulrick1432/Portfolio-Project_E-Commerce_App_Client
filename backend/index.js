const express = require('express');
const app = express();
const passport = require('passport');
const loaders = require('./loaders');

async function startServer() {

  // Init application loaders
  loaders(app, passport);

  const port = 4000

  // Start server
  app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`);
  })
}

startServer();
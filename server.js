/* createApplication() function exported by the express node module */
const express = require('express');

/* import the db connection from connection.js */
const db = require('./config/connection');

/* routes */
const routes = require('./routes');

/* set up for this server */
const PORT = 3001;
/* Create an Express app object for this server */
const app = express();

/* routes - middleware to handle url encoded and json input */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

/* connection inherits from EventEmitter class */
/* https://mongoosejs.com/docs/connections.html#connection-events */
/* Once the connection is open (open event), we want the server to listen for requests */
/* https://nodejs.org/api/events.html#emitteronceeventname-listener */
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}:`);
  });
});

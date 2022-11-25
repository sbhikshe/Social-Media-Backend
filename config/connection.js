/* get Mongoose instance from module.exports in mongoose/lib/index.js */
const mongoose = require('mongoose');

/* MongoDB connection URL to the database for this application */
const mongoDbUrl = 'mongodb://localhost:27017/socialMediaDB';

/* Use Mongoose to connect to the database */
mongoose.connect(mongoDbUrl);

/* exporting the connection which is the MongoDb.db instance */
module.exports = mongoose.connection;


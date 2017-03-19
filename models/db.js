const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'localhost';

mongoose.Promise = Promise;

// Local database connection
mongoose.connect(`mongodb://${dbURI}/signsdb`);
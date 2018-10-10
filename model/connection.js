var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/xiaov', { useMongoClient: true });

// Use native promises
mongoose.Promise = global.Promise;

console.log('mongoose is connected!')

module.exports = mongoose;




/*********

var connection = mongoose.createConnection('mongodb://localhost:27017/test');
module.exports = connection;

*********/
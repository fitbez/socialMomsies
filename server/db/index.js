/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mern-passport';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
	useMongoClient: true,
});

const db = mongoose.connection;

db.on('error', err => {
	console.log(`There was an error connecting to the database: ${err}`);
});
db.once('open', () => {
	console.log(
		`You have successfully connected to your mongo database: ${MONGODB_URI}`
	);
});

module.exports = db;

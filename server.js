// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments');
	require('dotenv').config();
}
require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./server/db'); // loads our connection to the mongo database
const passport = require('./server/passport');
const app = express();
const server = http.createServer(app); // http server object wrapper for use with socket.io
const io = socketIO(server); // instantiate socket io for the app using http server wrapper
require('./server/sockets/playgroup.js')(io);
const PORT = process.env.PORT || 3001;

// ===== Middleware ====
app.use(morgan('dev'));
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
);

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== testing middleware =====
// app.use(function(req, res, next) {
// 	console.log('===== passport user =======')
// 	console.log(req.session)
// 	console.log(req.user)
// 	console.log('===== END =======')
// 	next()
// })
// testing
// app.get(
// 	'/auth/google/callback',
// 	(req, res, next) => {
// 		console.log(`req.user: ${req.user}`)
// 		console.log('======= /auth/google/callback was called! =====')
// 		next()
// 	},
// 	passport.authenticate('google', { failureRedirect: '/login' }),
// 	(req, res) => {
// 		res.redirect('/')
// 	}
// )
/* Express app ROUTING */
app.use('/auth', require('./server/auth'));
// ==== if its production environment!
console.log(process.env.NODE_ENV, 'here');
// process.env.NODE_ENV === 'production'
if (true) {
	const path = require('path');
	console.log('YOU ARE IN THE PRODUCTION ENV');
	app.use('/static', express.static(path.join(__dirname, './client/build/static')));
	app.get('*', (req, res) => {
		console.log(path.join(__dirname, './client/build/index.html'));
		res.sendFile(path.join(__dirname, './client/build/index.html'));
	});
}



// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======');
	console.error(err.stack);
	res.status(500);
})
// ==== Starting Server =====
server.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`);
});

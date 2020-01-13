const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const GoogleStrategy = require('./googleStrategy')
const User = require('../db/models/User')


passport.serializeUser((user, done) => {
	//console.log('=== serialize ... called ===');
	//console.log(user); // the whole raw user object!
	//console.log('---------');
	done(null, /*{ _id: user._id }*/ user);
});

passport.deserializeUser((id, done) => {
	//console.log('deserialize ... called');
	User.findOne(
		{ _id: id },
		'email name image playgroups invites',
		(err, user) => {
			//console.log(user)
			//console.log('--------------')
			done(null, user)
		}
	);
});

// ==== Register Strategies ====
passport.use(LocalStrategy);
passport.use(GoogleStrategy);

module.exports = passport;

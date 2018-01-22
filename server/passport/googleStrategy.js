const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db/models/');

const strategy = new GoogleStrategy(
	{
		clientID: "961908331426-lvci427bk9qqdnk2qj93hhueta2b0pat.apps.googleusercontent.com",
		clientSecret: "AXtMBz-R_v8-SPTuHMHdVF_o",
		callbackURL: '/auth/google/callback'
	},
	function(token, tokenSecret, profile, done) {
		process.nextTick(function() {
			// testing
			//console.log('===== GOOGLE PROFILE =======');
			//console.log(profile);
			//console.log(profile.emails);
			//console.log('======== END ===========');
			// code
			const { id, displayName, emails, photos } = profile;

			User.findOne({ email: emails[0].value }).populate('invites').then(userMatch => {
				// if there is already someone with that email
				if (userMatch) {
					//console.log('userMatch:');
					//console.log(userMatch);
					if (userMatch.image !== photos[0].value) {
						User.findOneAndUpdate({_id: userMatch._id}, {'$set': {image: photos[0].value}}, {new: true}).then(result => {return done(null, result);});
					} else {
						return done(null, userMatch);
					}
				} else {
					// if no user in our db, create a new user with that email
					console.log('====== PRE SAVE =======');
					console.log(profile);
					console.log('====== post save ....');
					const newGoogleUser = new User({
						email: emails[0].value,
						name: displayName,
						image: photos[0].value,
					});
					// save this user
					newGoogleUser.save((err, savedUser) => {
						if (err) {
							console.log('Error occurred while saving new google user');
							console.log(err);
							return done(null, false);
						} else {
							return done(null, savedUser);
						}
					}); // closes newGoogleUser.save
				}
			}).catch(err => {// handle errors here:
				if (err) {
					console.log('Error occurred while trying to find user by email');
					console.log(err);
					return done(null, false);
				}
			}); // closes User Query
		});
	}
);

module.exports = strategy;

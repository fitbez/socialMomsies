const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	name: String,
	image: String,
	playgroups: [{
		type: Schema.Types.ObjectId,
		ref: "Playgroup",
	}],
	invites: [{
		type: Schema.Types.ObjectId,
		ref: "Playgroup",
	}],
});

var User;

if (mongoose.models.User) {
  User = mongoose.model('User');
} else {
  User = mongoose.model('User', UserSchema);
}

module.exports = User;

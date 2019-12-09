var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	name: String,
	image: String,
	invites: [{
		type: Schema.Types.ObjectId,
		ref: "Playgroup",
	}],
});

module.exports = mongoose.model("User", UserSchema);

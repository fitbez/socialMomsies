var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlaygroupSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	messages: [{
		type: Schema.Types.ObjectId,
		ref: "Message",
	}],
	owners: [{
		type: Schema.Types.ObjectId,
		ref: "User",
	}],
	members: [{
		type: Schema.Types.ObjectId,
		ref: "User",
	}],
	requests: [{
		type: Schema.Types.ObjectId,
		ref: "User",
	}],
});

module.exports = mongoose.model("Playgroup", PlaygroupSchema);
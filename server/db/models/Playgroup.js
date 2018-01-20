var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlaygroupSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	city: String,
	state: String,
	messages: [{body: String, sender: {type: Schema.Types.ObjectId, ref: "Playgroup",}}],
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
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	email:{type: String, unique: true}
	firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
	local: {
		username: { type: String, unique: false, required: false },
		password: { type: String, unique: false, required: false }
	},
	google: {
		googleId: { type: String, required: false }
	},
	photos: []
	// local: {
	// 	email: { type: String, unique: true },
	// 	password: { type: String }
	// },
	// google: {
	// 	id: { type: String },
	// 	photos: []
	// },
	// firstName: { type: String },
	// lastName: { type: String }
})
// Create reference to User & export
const User = mongoose.model('User', userSchema)
module.exports = User

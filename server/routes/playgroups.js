const express = require('express');
const router = express.Router();
const db = require('../db/models');
const passport = require('../passport');
const url = require('url');

const host = process.env.NODE_ENV === 'production' ? 'https://socialmomsies.herokuapp.com' : 'http://localhost:3000';

// example links
//`${host}/search`,
//`${host}/login`


router.post('/new', (req, res) => {
	const user = req.user;
	if (!user) res.status(401).res.end();
	const { name, city, state } = req.body;
	//console.log(req.body);
	//console.log(req.user);
	res.json(true);
	const playgroup = new db.Playgroup({
		name: name,
		city: city,
		state: state,
		owners: [ user._id ],
	}).save().then(result => {
		//console.log(result);
		res.status(200).json(result);
	}).catch(err => {
		res.status(400).json(err);
	});
});

router.get('/find', (req, res) => {
	const user = req.user;
	const queryData = url.parse(req.url, true).query;
	if (!user || !queryData) return res.status(401).end();
	
	db.Playgroup.find(queryData).populate('owners members requests').then(results => {
		//console.log(results);
		res.status(200).json(results);
	}).catch(err => {
		res.status(400).json(err);
	});
});

router.get('/joined', (req, res) => {
	const user = req.user;
	if (!user) return res.status(401).end();
	db.Playgroup.find({$or: [{owners: user._id}, {members: user._id}]}).populate('owners members requests').then(results => {
		//console.log(results);
		res.status(200).json(results);
	}).catch(err => {
		res.status(400).json(err);
	});
});

db.User.find({}).then(users => {
	users.forEach(user => {
		user.playgroups = undefined;
		user.save();
	});
});

module.exports = router;

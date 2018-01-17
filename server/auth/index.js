const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
)

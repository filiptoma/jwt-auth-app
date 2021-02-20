const User = require('../../db/models/User')
const RefreshToken = require('../../db/models/RefreshToken')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
	// Check if user already exists with any letter size variant
	const usernameExists = await User.findOne({
		username: req.body.username
	})
	if (usernameExists) return res.status(409).json({ message: 'Username already taken.' })

	// Check if the email is already in use
	const emailExists = await User.findOne({
		email: req.body.email
	})
	if (emailExists) return res.status(409).json({ message: 'E-mail already in use.' })

	// Encrypt user password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	// Initialize user record
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword
	})

	// Try to save the record to DB
	try {
		await user.save()
		res.status(201).end()
	} catch (error) {
		res.status(500).send(error)
	}
}

module.exports.login = async (req, res) => {
	// Check if user exists in DB
	const user = await User.findOne({
		username: req.body.username
	})
	if (!user) return res.status(400).json({ message: 'Incorrect username or password.' })

	// Check if the password for user is correct
	try {
		const passwordMatch = await bcrypt.compare(req.body.password, user.password)
		if (!passwordMatch) return res.status(400).json({ message: 'Incorrect username or password.' })
	} catch (error) {
		res.status(500).send(error)
	}

	const userData = {
		username: user.username
	}

	// Assign auth tokens to user
	const AT = jwt.sign(
		userData,
		process.env.AT_SECRET,
		{ expiresIn: '15m' }
	)
	const RT = jwt.sign(userData, process.env.RT_SECRET)

	// Initialize Refresh Token record
	const refToken = new RefreshToken({ RT: RT })
	// Save Refresh Token to DB
	try {
		await refToken.save()
	} catch (error) {
		res.status(500).send(error)
	}

	// Send auth tokens to front end
	res.status(200).json({ AT: AT, RT: RT })
}

module.exports.logout = async (req, res) => {
	// TODO: if user did not provide any token

	// Delete Refresh Token from DB
	try {
		await RefreshToken.deleteOne({ RT: req.body.rt })
		res.status(204).end()
	} catch (error) {
		res.status(500).send(error)
	}
}

const User = require('../../db/models/User')
const RefreshToken = require('../../db/models/RefreshToken')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
	// check if username already exists
	const usernameExists = await User.findOne({
		username: req.body.username
	})
	if (usernameExists) return res.status(409).json({ message: 'Username is taken.' })

	// check if the email is already in use
	const emailExists = await User.findOne({
		email: req.body.email
	})
	if (emailExists) return res.status(409).json({ message: 'E-mail already in use.' })

	// encrypt user password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	// initialize new user record
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword
	})

	// save the user record to DB
	await user.save()
	res.status(201).end()
}

module.exports.login = async (req, res) => {
	// check if user exists in DB
	const user = await User.findOne({
		username: req.body.username
	})
	if (!user) return res.status(400).json({ message: 'Incorrect username or password.' })

	// check if the provided password matches the user password
	const passwordMatch = await bcrypt.compare(req.body.password, user.password)
	if (!passwordMatch) return res.status(400).json({ message: 'Incorrect username or password.' })

	const userData = {
		username: user.username
	}
	// `expiry` should be slightly less than `expiresIn` (~30s less)
	const expiry = 5000  // how often is access token refreshed on frontend

	// create web tokens with user data
	// in production increase `expiresIn` to 10-15 min
	const accessToken = jwt.sign(
		userData,
		process.env.AT_SECRET,
		{ expiresIn: '6s' }
	)
	const refreshToken = jwt.sign(userData, process.env.RT_SECRET)

	// save refresh token to DB
	await new RefreshToken({ refreshToken: refreshToken }).save()

	// send httpOnly cookie with refresh token to frontend
	// `sameSite` has to be false, because auth server and client server have different `HOST`
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		sameSite: false
	})

	// send user data & access token payload to frontend
	res.status(200).json({ userData, accessToken, expiry })
}

module.exports.logout = async (req, res) => {
	// delete refresh token from DB
	await RefreshToken.deleteOne({ refreshToken: req.cookies['refreshToken'] })
	res.clearCookie('refreshToken')
	res.status(204).end()
}

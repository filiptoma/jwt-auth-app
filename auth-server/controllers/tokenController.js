const RefreshToken = require('../../db/models/RefreshToken')

const jwt = require('jsonwebtoken')
const crypto = require('crypto')

module.exports.renew = async (req, res) => {
	const refreshToken = req.cookies['refreshToken']
	// Client did not provide any refresh token
	if (!refreshToken) return res.status(401).json({ message: 'Unauthorized!' })

	// Refresh token not in DB
	const refreshTokenExists = await RefreshToken.findOne({ refreshToken: refreshToken })
	if (!refreshTokenExists) return res.status(403).json({ message: 'Forbidden!' })

	jwt.verify(
		refreshToken,
		process.env.RT_SECRET,
		(error, user) => {
			if (error) return res.status(403).json({ message: 'Forbidden!' })
			const userData = {
				username: user.username
			}
			const expiry = 5000
			const accessToken = jwt.sign(
				userData,
				process.env.AT_SECRET,
				{ expiresIn: '6s' }
			)

			// Send the access token to front end
			res.status(200).json({ userData, accessToken, expiry })
		}
	)
}

module.exports.test = (req, res) => {
	res.status(200).json({ testToken: crypto.randomBytes(10).toString('hex'), expiry: 5000 })
}

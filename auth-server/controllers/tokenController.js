const RefreshToken = require('../../db/models/RefreshToken')

const jwt = require('jsonwebtoken')
const crypto = require('crypto')

module.exports.renew = async (req, res) => {
	const refreshToken = req.body.refreshToken
	// Client did not provide any refresh token
	if (!refreshToken) return res.status(401).json({ message: 'Unauthorized!' })

	// Refresh token not in DB
	const refreshTokenExists = await RefreshToken.findOne({ RT: refreshToken })
	if (!refreshTokenExists) return res.status(403).json({ message: 'Forbidden!' })

	jwt.verify(
		refreshToken,
		process.env.RT_SECRET,
		(error, user) => {
			if (error) return res.status(403).send(error)
			const accessToken = jwt.sign(
				{ username: user.username },
				process.env.AT_SECRET,
				{ expiresIn: '15m' }
			)

			// Send the access token to front end
			res.json({ accessToken })
		}
	)
}

module.exports.test = (req, res) => {
	res.status(200).json({ testToken: crypto.randomBytes(10).toString('hex'), expiry: 4000 })
}

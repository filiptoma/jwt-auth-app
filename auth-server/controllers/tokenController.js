const RefreshToken = require('../../db/models/RefreshToken')
const jwt = require('jsonwebtoken')

const crypto = require('crypto')

module.exports.renew = async (req, res) => {
	const RT = req.body.rt
	// Client did not provide any RT
	if (!RT) return res.status(401).json({ message: 'Unauthorized!' })

	// Refresh Token not in DB
	const rtExists = await RefreshToken.findOne({ RT: RT })
	if (!rtExists) return res.status(403).json({ message: 'Forbidden!' })

	jwt.verify(
		RT,
		process.env.RT_SECRET,
		(error, user) => {
			if (error) return res.status(403).send(error)
			const AT = jwt.sign(
				{ username: user.username },
				process.env.AT_SECRET,
				{ expiresIn: '15m' }
			)

			// Send the Access Token to front end
			res.json({ AT: AT })
		}
	)
}

module.exports.test = (req, res) => {
	res.status(200).json({ testToken: crypto.randomBytes(10).toString('hex'), expiry: 5000 })
}

const RefreshToken = require('../../db/models/RefreshToken')

const jwt = require('jsonwebtoken')

module.exports.renew = async (req, res) => {
	const refreshToken = req.cookies['refreshToken']
	// client did not provide refresh token
	if (!refreshToken) return res.status(401).json({ message: 'Unauthorized!' })

	// refresh token not in DB
	const refreshTokenExists = await RefreshToken.findOne({ refreshToken: refreshToken })
	if (!refreshTokenExists) return res.status(403).json({ message: 'Forbidden!' })

	jwt.verify(
		refreshToken,
		process.env.RT_SECRET,
		(error, user) => {
			// expired or somehow invalid refresh token
			if (error) return res.status(403).json({ message: 'Forbidden!' })

			const userData = {
				username: user.username
			}
			// in production increase `expiresIn` to 10-15 min
			// `expiry` should be slightly less than `expiresIn` (~30s less)
			const expiry = 5000		// how often is access token refreshed on frontend
			const accessToken = jwt.sign(
				userData,
				process.env.AT_SECRET,
				{ expiresIn: '6s' }
			)

			// send the access token to front end
			res.status(200).json({ userData, accessToken, expiry })
		}
	)
}

const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	// `authHeader` is in form of `Bearer <token>`
	const accessToken = authHeader && authHeader.split(' ')[1]

	// client did not provide access token
	if (!accessToken) return res.status(401).json({ message: 'Unauthorized!' })

	jwt.verify(
		accessToken,
		process.env.AT_SECRET,
		(err, user) => {
			// access token is invalid or has timed out for this user
			// shouldn't happen if there is enough time between `silentRefresh` and access token expiration
			if (err) return res.status(403).json({ message: 'Forbidden!' })

			// else add the user object to the request
			// accessible by `request.user`
			req.user = user
			next()
		}
	)
}

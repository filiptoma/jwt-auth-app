const jwt = require('jsonwebtoken')

module.exports.authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const accessToken = authHeader && authHeader.split(' ')[1]

	// Client did not provide any access token
	if (!accessToken) return res.status(401).json({ message: 'Unauthorized!' })

	jwt.verify(
		accessToken,
		process.env.AT_SECRET,
		(error, user) => {
			// Token is invalid or has timed out for this user
			if (error) return res.status(403).json({ message: 'Forbidden!' })

			// Else add the user object to the request
			req.user = user
			next()
		}
	)
}

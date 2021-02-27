const User = require('../../db/models/User')

module.exports.myProfile = async (req, res) => {
	const profile = await User.findOne({
		username: req.user.username
	})

	res.status(200).json({ profile })
}

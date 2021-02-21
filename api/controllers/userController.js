const User = require('../../db/models/User')

module.exports.me = async (req, res) => {
	try {
		const profile = await User.findOne({
			username: req.user.username
		 })
		 res.status(200).json({ profile })
	} catch (error) {
		res.status(500).send(error)
	}
}

module.exports.profile = async (req, res) => {
	try {
		const profile = await User.findOne({
			username: req.body.username
		})
		res.status(200).json({ profile })
	} catch (error) {
		res.status(500).send(error)
	}
}

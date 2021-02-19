const Post = require('../models/Post')

module.exports.userPosts = async (req, res) => {
	// Next line is possible thanks to JWT middleware on this route (in TokenService.js)
	// const userData = req.user

	try {
		const userPosts = await Post.find({ author: req.user.username })
		res.status(200).json({ posts: userPosts })
	} catch (error) {
		res.status(400).send(error)
	}
}

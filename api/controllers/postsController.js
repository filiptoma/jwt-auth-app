const Post = require('../../db/models/Post')

module.exports.userPosts = async (req, res) => {
	// Next line is possible thanks to JWT middleware on this route (in TokenService.js)
	// const userData = req.user

	try {
		const posts = await Post.find({ author: req.user.username })
		res.status(200).json({ posts })
	} catch (error) {
		res.status(500).send(error)
	}
}

module.exports.allPosts = async (req, res) => {
	try {
		const posts = await Post.find()
		res.status(200).json({ posts })
	} catch (error) {
		res.status(500).send(error)
	}
}

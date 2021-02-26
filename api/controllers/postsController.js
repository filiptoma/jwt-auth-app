const Post = require('../../db/models/Post')

module.exports.myPosts = async (req, res) => {
	// Next line is possible thanks to JWT middleware on this route (in `TokenService.js`)
	// const userData = req.user

	try {
		const posts = await Post
												.find({ author: req.user.username })
												.sort({ createDate: 'desc' })
		res.status(200).json({ posts })
	} catch (error) {
		res.status(500).send(error)
	}
}

module.exports.allPosts = async (req, res) => {
	try {
		const posts = await Post
												.find()
												.sort({ createDate: 'desc' })
		res.status(200).json({ posts })
	} catch (error) {
		res.status(500).send(error)
	}
}

module.exports.newPost = async (req, res) => {
	// Initialize post record
	const post = new Post({
		author: req.user.username,
		post: req.body.post
	})

	// Save the record to DB
	try {
		await post.save()
		res.status(201).end()
	} catch (error) {
		res.status(500).send(error)
	}
}

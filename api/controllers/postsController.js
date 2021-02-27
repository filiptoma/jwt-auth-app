const Post = require('../../db/models/Post')

module.exports.myPosts = async (req, res) => {
	// `request.user.username` is possible due to jwt middleware on this route
	const posts = await Post
												.find({ author: req.user.username })
												.sort({ createDate: 'desc' })

	res.status(200).json({ posts })
}

module.exports.allPosts = async (req, res) => {
	const posts = await Post
												.find()
												.sort({ createDate: 'desc' })

	res.status(200).json({ posts })
}

module.exports.newPost = async (req, res) => {
	// initialize new post record
	const post = new Post({
		author: req.user.username,
		post: req.body.post
	})

	// save the post record to DB
	await post.save()
	res.status(201).end()
}

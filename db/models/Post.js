const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	author: { type: String, required: true },
	post: { type: String, required: true },
	createDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', postSchema, 'posts')

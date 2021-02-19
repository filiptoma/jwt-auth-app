const express = require('express')
const db = require('./db')

const app = express()

// Init body-parser options (inbuilt with Express)
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

// Import API routes
const posts = require('./routes/posts')

// Use API routes
app.use(posts)

// Export the server middleware
module.exports = {
	path: '/api',
	handler: app
}

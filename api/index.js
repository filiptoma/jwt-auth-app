const express = require('express')
const connect = require('../db/connect')

const app = express()

// Init body-parser options (inbuilt with Express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Import API routes
const routes = require('./routes')

// Use API routes
app.use(routes)

// Export the server middleware
module.exports = {
	path: '/api',
	handler: app
}

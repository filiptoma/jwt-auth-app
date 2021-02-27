const express = require('express')
const dbConnect = require('../db/connect')

const app = express()

// init body-parser options (provided in Express package)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// import api routes
const routes = require('./routes')

// use api routes
app.use(routes)

// export the server middleware for Nuxt.js to use
module.exports = {
	path: '/api',
	handler: app
}

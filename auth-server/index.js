const express = require('express')
const connect = require('../db/connect')

const app = express()

require('dotenv').config()

// Init body-parser options (inbuilt with Express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS middleware - must be before app.use(routes)
const cors = require('cors')
// Allow requests only from this origin, refer npm cors docs for more
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true
}))
// app.use(cors())

// Middleware for parsing request.headers.cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Import auth API routes
const routes = require('./routes')

// Use auth API routes
app.use(routes)

app.listen(4000)

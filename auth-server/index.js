const express = require('express')
const dbConnect = require('../db/connect')

const app = express()

// TODO: admin controller

// get `.env` variables as soon as possible
require('dotenv').config()

// init body-parser options (provided in Express package)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS middleware - must be before `app.use(routes)`
const cors = require('cors')
// allow requests only from this origin, refer `npm CORS` docs for more
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true
}))

// middleware for parsing `request.headers.cookie`
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// import auth routes
const routes = require('./routes')

// use auth routes
app.use(routes)

app.listen(4000)

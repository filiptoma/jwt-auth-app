const express = require('express')
const connect = require('../db/connect')

const app = express()

require('dotenv').config()

// Init body-parser options (inbuilt with Express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Here would be cors middleware - must be before app.use(routes)

// TODO: delete cookie-parser and cors from dependencies

// Middleware for parsing request.headers.cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Import auth API routes
const routes = require('./routes')

// Use auth API routes
app.use(routes)

app.listen(4000)

const express = require('express')
const connect = require('../db/connect')

const app = express()

require('dotenv').config()

// Init body-parser options (inbuilt with Express)
app.use(express.json())

// Import auth API routes
const routes = require('./routes')

// Use auth API routes
app.use(routes)

app.listen(4000)

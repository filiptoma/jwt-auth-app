const express = require('express')
const db = require('./db')

const app = express()

require('dotenv').config()

// Init body-parser options (inbuilt with Express)
app.use(express.json())

// Import auth API routes
const routes = require('./routes')

// Use auth API routes
app.use(routes)

app.listen(4000)

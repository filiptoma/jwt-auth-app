const express = require('express')
const connect = require('../db/connect')

const app = express()

require('dotenv').config()

// Init body-parser options (inbuilt with Express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require('cors')
// Has to be above app.use(routes)
// Allow requests only from this origin, refer npm cors docs for more
app.use(cors({ origin: 'http://localhost:3000' }))

// Import auth API routes
const routes = require('./routes')

// Use auth API routes
app.use(routes)

app.listen(4000)

const express = require('express')
const app = express()

require('dotenv').config()

const { Nuxt, Builder } = require('nuxt')

// Import and use Nuxt.js options
const nuxtConfig = require('../nuxt.config')

async function start () {
	// Init Nuxt.js
	const nuxt = new Nuxt(nuxtConfig)
	const { host, port } = nuxt.options.server

	await nuxt.ready()
	// Build only in dev mode
	if (nuxtConfig.dev) {
		const builder = new Builder(nuxt)
		await builder.build()
	}

	// Give Nuxt.js middleware to Express
	app.use(nuxt.render)

	// Listen to the server
	app.listen(port, host)
}

start()

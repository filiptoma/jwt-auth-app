const express = require('express')
const app = express()

// get `.env` variables as soon as possible
require('dotenv').config()

const { Nuxt, Builder } = require('nuxt')

// import and use Nuxt.js options
const nuxtConfig = require('../nuxt.config')

async function start () {
	// init Nuxt.js
	const nuxt = new Nuxt(nuxtConfig)
	const { host, port } = nuxt.options.server

	await nuxt.ready()
	// build only in dev mode
	if (nuxtConfig.dev) {
		const builder = new Builder(nuxt)
		await builder.build()
	}

	// give Nuxt.js middleware to Express
	app.use(nuxt.render)

	// listen to the client server (defaults to port 3000)
	app.listen(port, host)
}

start()

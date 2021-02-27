// get `.env` variables as soon as possible
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(
	process.env.DB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	}
)

// use `.connection` only if connecting to one database, refer `npm mongoose` docs
let dbConnect = mongoose.connection
dbConnect.on('error', console.error.bind(console, 'DB connection error:'))
dbConnect.once('open', () => {
	console.log('DB connection successful!')
})

module.exports = dbConnect

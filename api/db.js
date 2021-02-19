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

let db = mongoose.connection
db.on('error', console.error.bind(console, 'DB connection error:'))
db.once('open', () => {
	console.log('DB connection successful!')
})

module.exports = db

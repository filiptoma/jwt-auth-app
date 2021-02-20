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

let connect = mongoose.connection
connect.on('error', console.error.bind(console, 'DB connection error:'))
connect.once('open', () => {
	console.log('DB connection successful!')
})

module.exports = connect

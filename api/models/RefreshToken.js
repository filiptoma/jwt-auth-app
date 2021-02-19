const mongoose = require('mongoose')

const rtSchema = new mongoose.Schema({
	RT: { type: String }
})

module.exports = mongoose.model('RefreshToken', rtSchema, 'rts')

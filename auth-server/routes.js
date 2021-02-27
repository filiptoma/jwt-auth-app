const { Router } = require('express')
const router = Router()

const authController = require('./controllers/authController')
const tokenController = require('./controllers/tokenController')

// auth routes
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.delete('/auth/logout', authController.logout)

// token route
router.get('/auth/token', tokenController.renew)

module.exports = router

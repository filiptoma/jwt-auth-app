const { Router } = require('express')
const router = Router()

const authController = require('./controllers/authController')
const tokenController = require('./controllers/tokenController')

// Auth routes
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.delete('/auth/logout', authController.logout)

// Token routes
router.post('/token', tokenController.renew)
router.get('/token/test', tokenController.test)

module.exports = router

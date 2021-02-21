const { Router } = require('express')
const router = Router()

const utils = require('./utils')

const postsController = require('./controllers/postsController')
const userController = require('./controllers/userController')

// Posts routes
router.get('/posts/user', utils.authenticateToken, postsController.userPosts)
router.get('/posts/all', postsController.allPosts)

// User routes
router.get('/user/me', utils.authenticateToken, userController.me)
router.get('/user/profile', userController.profile)

module.exports = router

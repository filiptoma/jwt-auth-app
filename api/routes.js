const { Router } = require('express')
const router = Router()

const utils = require('./utils')

const postsController = require('./controllers/postsController')
const userController = require('./controllers/userController')

// Posts routes
router.get('/posts/me', utils.authenticateToken, postsController.myPosts)
router.get('/posts/all', postsController.allPosts)
router.post('/posts/new', utils.authenticateToken, postsController.newPost)

// User route
router.get('/user/me', utils.authenticateToken, userController.me)

module.exports = router

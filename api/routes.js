const { Router } = require('express')
const router = Router()

const utils = require('./utils')

const postsController = require('./controllers/postsController')
const userController = require('./controllers/userController')

// posts routes
router.get('/posts/me', utils.verifyToken, postsController.myPosts)
router.get('/posts/all', postsController.allPosts)
router.post('/posts/new', utils.verifyToken, postsController.newPost)

// user route
router.get('/user/me', utils.verifyToken, userController.myProfile)

module.exports = router

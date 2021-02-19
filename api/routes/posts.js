const router = require('express').Router()
const postsController = require('../controllers/postsController')
const tokenService = require('../services/TokenService')

router.get(
	'/posts/user',
	postsController.userPosts
)

router.get(
	'/posts/all',
	postsController.allPosts
)

module.exports = router

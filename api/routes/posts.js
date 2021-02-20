const router = require('express').Router()
const postsController = require('../controllers/postsController')
const utils = require('../utils')

router.get(
	'/posts/user',
	utils.authenticateToken,
	postsController.userPosts
)

router.get(
	'/posts/all',
	postsController.allPosts
)

module.exports = router

const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')
const PostsController = require('../../controllers/postsController')
const { check } = require('express-validator/check')

// @ GET Public api/v1/posts
router.post(
  '/',
  [
    authMiddleware,
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  PostsController.createPost
)

module.exports = router

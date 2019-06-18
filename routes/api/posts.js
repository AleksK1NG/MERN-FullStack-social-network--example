const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')
const PostsController = require('../../controllers/postsController')
const { check } = require('express-validator/check')

// @ POST Private create post
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

// @ GET Public get all posts
router.get('/', PostsController.getAllPosts)

// @ GET Public get post by id
router.get('/:id', PostsController.getPostById)

module.exports = router

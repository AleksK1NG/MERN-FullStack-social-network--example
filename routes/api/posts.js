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

// @ DELETE Private delete post
router.delete('/:id', authMiddleware, PostsController.deletePost)

// @ PUT Private Like post
router.put('/like/:id', authMiddleware, PostsController.likePost)

// @ PUT Private Unlike post
router.put('/unlike/:id', authMiddleware, PostsController.unLikePost)

// @ POST Private add Comment to the post
router.post(
  '/comment/:id',
  [
    authMiddleware,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  PostsController.addCommentToPost
)

// @ DELETE Private Delete Comment from the post
router.delete('/comment/:id/:comment_id', authMiddleware, PostsController.deleteCommentFromPost)

module.exports = router

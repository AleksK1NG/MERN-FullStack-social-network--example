const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/comments');
const AuthCtrl = require('../middlewares/auth');



router.get('/user/:id', CommentsController.getAllCommentsByUserId);
router.get('/blog/:id', CommentsController.getAllCommentsByBlogId);
router.get('/:id', CommentsController.getCommentById);
router.post('/', AuthCtrl.onlyAuthUser, CommentsController.createComment);
router.patch('/:id', AuthCtrl.onlyAuthUser, CommentsController.updateComment);
router.delete('/:id', AuthCtrl.onlyAuthUser, CommentsController.deleteComment);

module.exports = router;

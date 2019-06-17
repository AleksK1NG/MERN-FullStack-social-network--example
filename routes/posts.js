const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts');
const AuthCtrl = require('../middlewares/auth');
const PostOwnerCtrl = require('../middlewares/postOwner');

router.get('/user/:id', PostsController.getPostsByUserId);
// router.get('/:userId/:id', PostsController.getPostByUserId);
router.get('/:id', PostsController.getPostById);
router.get('/', PostsController.getAllPosts);

router.post('/', AuthCtrl.onlyAuthUser, PostsController.createPost);
// router.patch('/:id/update', AuthCtrl.onlyAuthUser, PostsController.updatePost);
router.patch('/:id/update', [AuthCtrl.onlyAuthUser, PostOwnerCtrl.isPostOwner], PostsController.updatePost);
router.delete('/:id/delete',[AuthCtrl.onlyAuthUser, PostOwnerCtrl.isPostOwner], PostsController.deletePost);

module.exports = router;

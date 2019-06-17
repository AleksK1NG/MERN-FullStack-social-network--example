const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blog');
const AuthCtrl = require('../middlewares/auth');

router.post('/', AuthCtrl.onlyAuthUser, BlogController.createBlog);
router.get('/:id', BlogController.getBlogById);
router.get('/user/:userId', BlogController.getBlogsByUserId);
router.get('/', BlogController.getBlogsByPage);
router.post('/create', AuthCtrl.onlyAuthUser, BlogController.createUserBlog);
router.delete('/delete', AuthCtrl.onlyAuthUser, BlogController.deleteUserBlog);
router.patch('/:id', AuthCtrl.onlyAuthUser, BlogController.updateBlog);
router.delete('/:id', AuthCtrl.onlyAuthUser, BlogController.deleteBlog);

module.exports = router;

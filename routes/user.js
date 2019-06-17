const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const AuthCtrl = require('../middlewares/auth');

router.get('/me', AuthCtrl.onlyAuthUser, UserController.getCurrentUser);
router.get('/:id', UserController.getUser);
router.get('/', UserController.getAllUsers);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.login);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;

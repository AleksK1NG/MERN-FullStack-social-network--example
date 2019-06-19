const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')
const AuthController = require('../../controllers/authController')
const { check } = require('express-validator/check')

// @ GET Public api/v1/auth Load current user by token
router.get('/me', authMiddleware, AuthController.loadUser)

// @ POST Public api/v1/auth Login user
router.post(
  '/login',
  [check('email', 'Please enter valid email').isEmail(), check('password', 'Password is required').exists()],
  AuthController.login
)

// @ POST Public api/v1/auth Register user
router.post(
  '/register',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter password with 6 or more length').isLength({ min: 6 })
  ],
  AuthController.register
)

module.exports = router

const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')
const AuthController = require('../../controllers/authController')
const { check } = require('express-validator/check')

// @ GET Public api/v1/auth
router.get('/', authMiddleware, AuthController.loadUser)

// @ POST Public api/v1/users
router.post('/',[
  check('email', 'Please enter valid email').isEmail(),
  check('password', 'Password is required').exists()
], AuthController.authAndGetToken)

module.exports = router

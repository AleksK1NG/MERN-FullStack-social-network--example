const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/usersController')
const { check } = require('express-validator/check')

// @ POST Public api/v1/users
router.post(
  '/register',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter password with 6 or more length').isLength({ min: 6 })
  ],
  UserController.register
)

// @ POST Public api/v1/users
router.post('/login',[
  check('email', 'Please enter valid email').isEmail(),
  check('password', 'Please enter password with 6 or more length').isLength({ min: 6 })
], UserController.login)

module.exports = router

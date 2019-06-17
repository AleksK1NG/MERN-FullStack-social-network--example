const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/usersController')

// @ GET Public api/v1/users
router.get('/', UserController.handlerName)

module.exports = router

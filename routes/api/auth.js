const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')
const AuthController = require('../../controllers/authController')

// @ GET Public api/v1/auth
router.get('/', authMiddleware, AuthController.loadUser)

module.exports = router

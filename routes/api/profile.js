const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')
const ProfilesController = require('../../controllers/profilesController')
const { check } = require('express-validator/check')

// @ GET Private api/v1/profile Get Current user profile
router.get('/me', authMiddleware, ProfilesController.getCurrentUserProfile)

module.exports = router
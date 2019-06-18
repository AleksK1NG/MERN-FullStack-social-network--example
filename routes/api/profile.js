const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')
const ProfilesController = require('../../controllers/profilesController')
const { check } = require('express-validator/check')

// @ GET Private api/v1/profile Get Current user profile
router.get('/me', authMiddleware, ProfilesController.getCurrentUserProfile)

// @ GET Public api/v1/profile Get All Profiles
router.get('/', ProfilesController.getAllUsersProfiles)

// @ GET Public api/v1/profile Get All Profiles
router.get('/user/:id', ProfilesController.getProfileByUserId)

// @ POST Private api/v1/profile Create
router.post(
  '/',
  [
    authMiddleware,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  ProfilesController.createUserProfile
)

// @ PATCH Private api/v1/profile  Update user profile
router.patch(
  '/',
  [
    authMiddleware,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  ProfilesController.updateUserProfile
)

// @ PUT Add experience
router.put('/experience', authMiddleware, ProfilesController.addExperience)

// @ PUT Add education
router.put(
  '/education',
  [
    authMiddleware,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  ProfilesController.addEducation
)

// @ DELETE Private Delete profile, user & posts
router.delete(
  '/',
  [
    authMiddleware,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  ProfilesController.deleteUserProfile
)

// @ DELETE Private Delete experience
router.delete('/experience/:exp_id', authMiddleware, ProfilesController.deleteExperience)

// @ DELETE Private Delete education
router.delete('/education/:edu_id', authMiddleware, ProfilesController.deleteEducation)

module.exports = router

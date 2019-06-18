const Profile = require('../models/Profile')
const User = require('../models/User')
const { validationResult } = require('express-validator/check')

// @ GET Get current user profile
module.exports.getCurrentUserProfile = async (req, res) => {
  try {
    // find user profile by user.id and populate user object fields
    const profile = await Profile.findOne({ user: req.user.id }).populate('name', ['name', 'avatar', 'email'])
    if (!profile) return res.status(400).json({ errors: [{ msg: 'Not found profile for this user' }] })

    res.status(200).json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

// @ POST Create user profile
module.exports.createUserProfile = async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body

  // Build profile object
  const profileFields = {}
  profileFields.user = req.user.id
  if (company) profileFields.company = company
  if (website) profileFields.website = website
  if (location) profileFields.location = location
  if (bio) profileFields.bio = bio
  if (status) profileFields.status = status
  if (githubusername) profileFields.githubusername = githubusername
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim())
  }

  // Build social object
  profileFields.social = {}
  if (youtube) profileFields.social.youtube = youtube
  if (twitter) profileFields.social.twitter = twitter
  if (facebook) profileFields.social.facebook = facebook
  if (linkedin) profileFields.social.linkedin = linkedin
  if (instagram) profileFields.social.instagram = instagram

  try {
    // validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    // search user profile by user.id
    let profile = await Profile.findOne({ user: req.user.id })

    // if profile  exists - error
    if (profile) return res.status(400).json({ errors: [{ msg: 'Profile already exists' }] })

    // Create profile
    profile = new Profile(profileFields)
    await profile.save()

    console.log('PROFILE CREATE => ', profile)
    res.status(201).json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

// @ PATCH Update user profile
module.exports.updateUserProfile = async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body

  // Build profile object
  const profileFields = {}
  profileFields.user = req.user.id
  if (company) profileFields.company = company
  if (website) profileFields.website = website
  if (location) profileFields.location = location
  if (bio) profileFields.bio = bio
  if (status) profileFields.status = status
  if (githubusername) profileFields.githubusername = githubusername
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim())
  }

  // Build social object
  profileFields.social = {}
  if (youtube) profileFields.social.youtube = youtube
  if (twitter) profileFields.social.twitter = twitter
  if (facebook) profileFields.social.facebook = facebook
  if (linkedin) profileFields.social.linkedin = linkedin
  if (instagram) profileFields.social.instagram = instagram

  try {
    // validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    // search user profile by user.id
    let profile = await Profile.findOne({ user: req.user.id })

    // if profile does not exists - update
    if (!profile) return res.status(400).json({ errors: [{ msg: 'Not found profile for this user' }] })

    // update find by user.id, $set: update user object, new: true - for get updated user back
    profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })

    console.log('PROFILE UDPATE => ', profile)
    return res.status(201).json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

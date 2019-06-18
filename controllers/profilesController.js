const Profile = require('../models/Profile')
const User = require('../models/User')
const Post = require('../models/Post')
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

module.exports.getAllUsersProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar', 'email'])

    res.status(200).json(profiles)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

module.exports.getProfileByUserId = async (req, res) => {
  const userId = req.params.id
  try {
    const profile = await Profile.findOne({ user: userId })
    if (!profile) return res.status(400).json({ errors: [{ msg: 'Profile does not found' }] })

    res.status(200).json(profile)
  } catch (error) {
    console.error(error.message)
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Profile does not found' }] })
    }
    res.status(500).send('Server Error')
  }
}

module.exports.deleteUserProfile = async (req, res) => {
  try {
    // // Remove user posts
    await Post.deleteMany({ user: req.user.id })

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id })
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: 'User deleted' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

module.exports.addExperience = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { title, company, location, from, to, current, description } = req.body

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    profile.experience.unshift(newExp)

    await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

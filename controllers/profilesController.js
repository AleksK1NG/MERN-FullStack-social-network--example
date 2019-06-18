const Profile = require('../models/Profile')
const User = require('../models/User')

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

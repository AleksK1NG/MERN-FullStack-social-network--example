const User = require('../models/User')

module.exports.loadUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    console.log('load user => ', user)
    res.json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

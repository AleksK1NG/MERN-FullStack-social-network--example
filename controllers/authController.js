const User = require('../models/User')
const { validationResult } = require('express-validator/check')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// @GET Public load user
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

// @POST Public login user and get token
module.exports.login = async (req, res) => {
  const { email, password } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    // check user exists
    let user = await User.findOne({ email })
    if (!user) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })

    // compare password with db user password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })

    const payload = { user: { id: user.id } }

    // Add token to user
    await jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: 360000 }, (error, token) => {
      if (error) throw error
      user.token = token
      res.status(201).json(user.toAuthJSON())
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

// @POST Register user
module.exports.register = async (req, res) => {
  const { email, name, password, info } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    // check user exists
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    // create avatar
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
    // create user
    user = new User({ email, name, info, avatar })
    // create hashed password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    const payload = { user: { id: user.id } }

    // save user in db
    await user.save()

    // Add token to user
    await jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: 360000 }, (error, token) => {
      if (error) throw error
      user.token = token
      res.status(201).json(user.toAuthJSON())
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

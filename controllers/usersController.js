const User = require('../models/User')
const { validationResult } = require('express-validator/check')

module.exports.register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    console.log('Register controller => ', req.body)
    res.status(201).json(req.body)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

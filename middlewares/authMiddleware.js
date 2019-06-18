const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')

  // if no token
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' })

  // Verify token
  try {
    // decode token
    const decoded = jwt.verify(token, config.get('JWT_SECRET'))

    // add decoded user from token to req body
    req.user = decoded.user
    console.log('from auth middleware => ', decoded)
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ msg: 'Toke is not valid' })
  }
}

const express = require('express')
const router = express.Router()

// @ GET Public api/v1/users
router.get('/', (req, res) => {
  res.send('Success =D')
})

module.exports = router

const express = require('express')
const router = express.Router()

// @ GET Public api/v1/posts
router.get('/', async (req, res) => {
  res.send('Success =D')
})

module.exports = router
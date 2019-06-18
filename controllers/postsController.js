const Profile = require('../models/Profile')
const User = require('../models/User')
const Post = require('../models/Post')
const { validationResult } = require('express-validator/check')
const config = require('config')
const request = require('request')

// @ POST Create post
module.exports.createPost = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const user = await User.findById(req.user.id).select('-password')

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    })

    const post = await newPost.save()

    res.status(201).json(post)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

// @ GET Get all posts
module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

// @ GET Get post by id
module.exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.json(post)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

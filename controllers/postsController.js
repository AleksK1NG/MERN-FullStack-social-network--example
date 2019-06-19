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
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
}

// @ DELETE Delete post
module.exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    // Check user is creator of post, toString() to convert object type
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorized' })
    }

    await post.remove()

    res.json({ msg: 'Post has been removed' })
  } catch (error) {
    console.error(error.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.status(500).send('Server Error')
  }
}

// @ PUT Like post
module.exports.likePost = async (req, res) => {
  console.log('like post => ', req.params.id)
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post already liked
    if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post is already liked' })
    }

    post.likes.unshift({ user: req.user.id })

    await post.save()

    res.status(201).json(post.likes)
  } catch (error) {
    console.error(error)
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
}

// @ PUT Unlike post
module.exports.unLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post already liked
    if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post is already liked' })
    }

    // Get index
    const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id)

    post.likes.splice(removeIndex, 1)

    await post.save()

    res.status(201).json(post.likes)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

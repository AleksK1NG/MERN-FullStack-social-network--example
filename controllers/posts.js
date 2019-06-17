const Post = require('../models/Post');

module.exports.getPostsByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const userPosts = await Post.find({ creatorId: id });
    if (!userPosts) return res.status(422).send({ error });

    res.status(200).json(userPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findById(id, (error, post) => {
      if (error) {
        return res.status(422).send('Posts not found');
      }

      res.status(201).json(post);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) return res.status(422).send('Posts not found');

    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.createPost = async (req, res) => {
  const { title, imageURL, tags, text, isPublished } = req.body;
  console.log('CREATE post user => ', req.user);
  try {
    const newPost = new Post({
      creatorId: req.user._id,
      title,
      imageURL,
      tags,
      text,
      isPublished
    });
    console.log('CREATE post newPost: ', newPost);

    const post = await newPost.save();

    console.log('CREATE post post: ', post);
    res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, imageURL, tags, text, isPublished } = req.body;
  try {
    const $set = { title, imageURL, tags, text, isPublished };
    const post = await Post.findOneAndUpdate({ _id: id }, { $set }, { new: true });

    return res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.deleteOne({ _id: id });
    res.status(201).json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

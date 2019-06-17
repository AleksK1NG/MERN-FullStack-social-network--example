const Post = require('../models/Post');

module.exports.isPostOwner = async (req, res, next) => {
  // 401 Unauthorized
  // 403 Forbidden
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id });

    if (post.creatorId.toString() === req.user._id.toString()) {
      return next();
    }
    return res.status(403).json({ message: 'Post can be updated only by creator' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

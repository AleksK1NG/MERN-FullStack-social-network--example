const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.getAllCommentsByBlogId = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ blogId: id });
    if (!comments) return res.status(404).send('Comments with the given Blog ID was not found.');

    res.status(200).json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllCommentsByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ userId: id });
    if (!comments) return res.status(404).send('Comments with the given User ID was not found.');

    res.status(200).json(comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.find({ _id: id });
    if (!comment) return res.status(404).send('Comment with the given ID was not found.');

    res.status(200).json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.createComment = async (req, res) => {
  const { text, postId } = req.body;
  try {
    const newComment = new Comment({ creatorId: req.user._id, text, postId });

    const comment = await newComment.save();
    const post = await Post.findById({ _id: postId });
    post.commentsIds.push(comment._id);
    await post.save();

    res.status(200).json(comment);
    // const comment = new Comment({ creatorId: req.user._id, text, postId });
    //
    // comment.save((errors, comment) => {
    //   if (errors) {
    //     return res.status(422).send({ errors });
    //   }
    //   return res.status(200).json(comment);
    // });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    await Comment.findByIdAndUpdate(id, { $set: { text } }, { new: true }).exec((error, comment) => {
      if (error) {
        return res.status(422).send({ error });
      }

      return res.status(200).json(comment);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    await Comment.findByIdAndRemove(id).exec((error, comment) => {
      if (error) {
        return res.status(422).send({ error });
      }

      res.status(200).json(comment);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

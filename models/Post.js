const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true
  },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  imageURL: String,
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10000
  },
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
  commentsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

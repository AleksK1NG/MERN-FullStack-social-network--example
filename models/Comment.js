const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxlength: [5012, 'Too long, max is 512 characters'],
    minlength: [1, 'Too short, min is 1 character']
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Comment = mongoose.model('Comment', commentsSchema);

module.exports = Comment;

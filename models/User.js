const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    minlength: [6, 'Too short, min is 6 characters'],
    required: 'Password is required'
  },
  avatar: {
    type: String
  },
  info: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    avatar: this.avatar,
    name: this.name,
    info: this.info,
    email: this.email,
    token: this.token
  }
}
const User = mongoose.model('User', UserSchema)

module.exports = User

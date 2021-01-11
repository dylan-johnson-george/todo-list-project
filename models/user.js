const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
  googleId: {
    type: String,
    required: true
  }, 
  familyName: {
    type: String
  }, 
  givenName: {
    type: String
  }
}, {
  timestamps: {createdAt: 'created_at'}
})


const User = mongoose.model('User', userSchema)

module.exports = User
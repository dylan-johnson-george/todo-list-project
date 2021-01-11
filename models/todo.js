const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
  googleId: {
      type: String, 
      required: true
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {createdAt: 'created_at'}
})


const Todo = mongoose.model('Todo', todoSchema)


module.exports = Todo
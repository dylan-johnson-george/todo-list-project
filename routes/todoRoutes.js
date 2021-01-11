const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const Todo = require('../models/todo')


router.post('/todos', isLoggedIn, async (req, res) => {
    const todo = new Todo({
      googleId: req.user.googleId,
      title: req.body.title,
      completed: req.body.completed
    })
    try {
      await todo.save()
      res.status(201).send(todo)
    } catch(e) {
      res.status(400).send(e)
    }
})

router.get('/todos', isLoggedIn, async (req, res) => {
  try {
    const todos = await Todo.find({googleId: req.user.googleId})
    res.status(200).send(todos)
  } catch(e) {
    res.send(e)
  }
})


router.delete('/todos' , isLoggedIn, async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.body.id)
    res.send(deletedTodo)
  } catch(e) {
    res.send(e)
  }
})


router.put('/todos', isLoggedIn, async (req,res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.body.id , {completed: true})
    res.send(updatedTodo)
  }catch(e) {
    res.send(e)
  }
})




module.exports = router

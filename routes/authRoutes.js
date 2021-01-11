
const passport = require('passport')
const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const isProduction = require('../utils.js/isProduction')



router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/auth/google/callback', passport.authenticate('google'), (req,res) => {
  res.redirect(301, isProduction ? 'https://djg-todo-list.herokuapp.com/' : 'http://localhost:3000' )  
})


router.get('/logout', isLoggedIn, (req, res) => {
  req.logout()
  res.send(req.user)
})

router.get('/current_user', async (req, res) => {
  res.json(req.user) 
})

module.exports = router
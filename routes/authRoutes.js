
const passport = require('passport')
const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const clientDomain = require('../utils.js/clientDomain')

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/auth/google/callback', passport.authenticate('google'), (req,res) => {
  res.redirect(301, clientDomain)  
})


router.get('/logout', isLoggedIn, (req, res) => {
  req.logout()
  res.send(req.user)
})

router.get('/current_user', async (req, res) => {
  res.json(req.user) 
})

module.exports = router
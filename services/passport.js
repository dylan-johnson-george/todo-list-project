const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const User = require('../models/user')

passport.serializeUser(((user, done) => {
  done(null, user.id)
 }))
 
 passport.deserializeUser((id, done) => {
   User.findById(id)
   .then((user) => {
     done(null,user) 
   }) 
 })
 

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({googleId: profile.id}).then((existingUser) => {
      if(existingUser) {
        done(null,existingUser)
       } else {
        new User({ 
          googleId: profile.id,
          givenName: profile.name.givenName,
          familyName: profile.name.familyName
        })
        .save()
        .then(user => done(null, user))
      }
    }).catch((e) => {
      console.log(e)
    }) 
  }
))
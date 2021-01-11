const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const cookieSession = require('cookie-session')
const todoRoutes = require('./routes/todoRoutes')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config()
require('./services/passport')
const clientDomain = require('./utils.js/clientDomain')


const app = express()
const port = process.env.PORT || 4000


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors({
  credentials: true,
  origin: clientDomain
}))

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json())

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
    // Enable the cookie to be altered on the front-end
    httpOnly: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(todoRoutes)
app.use(authRoutes)

app.listen(port, () => {
  console.log('Listening on port 4000')
})


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
const path = require('path')

const app = express()
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

const port = process.env.PORT || 4000


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log('Listening on port 4000')
})


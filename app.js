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
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  // app.get('*', function(req, res) {
  //   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  // });
}

const port = process.env.PORT || 4000


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))


// const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://shrouded-journey-38552.heroku']
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin)
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable")
//       callback(null, true)
//     } else {
//       console.log("Origin rejected")
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))



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


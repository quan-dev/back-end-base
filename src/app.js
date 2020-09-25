const dotenv = require('dotenv').config()
dotenv.load
//express
let express = require('express')
let bodyparser = require('body-parser')
let app = express()

//routes to api
let router = require('./routes/router')

//mongoDb
require('./common/connection')

// app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyparser.json({ limit: '10mb', extended: true }))

// app.use(express.urlencoded({ extended: false }));
// // app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());

//config http header request
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // let allowedOrigins = ['http://localhost:4200', 'http://localhost:3330', "https://xcdc.herokuapp.com/", "http://xcdc.ueuo.com/"];
  // let origin = req.headers.origin;
  // if (allowedOrigins.indexOf(origin) > -1) {
  //     res.setHeader('Access-Control-Allow-Origin', origin);
  // }
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, token'
  )
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})
app.use('/public', express.static(__dirname + 'public'))

app.use('/api', router)

app.all('*', function (req, res) {
  res.json({
    status: 404,
    message: 'Error in your URL!',
  })
})

module.exports = app

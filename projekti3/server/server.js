const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const itemRouter = require('./routes/itemRouter')
require('dotenv').config()
const cors = require('cors')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true })

app.use(cors())
app.use(bodyParser.json())
app.use('/api',itemRouter)

app.listen(process.env.PORT, function() {
  console.log(`App running on port ${process.env.PORT}`)
})
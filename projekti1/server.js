const express = require('express')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const messageRouter = require('./routes/message')
const guestbookRouter = require('./routes/guestbook')

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', indexRouter)
app.use('/guestbook', guestbookRouter)
app.use('/newmessage', messageRouter)

app.listen(8081)

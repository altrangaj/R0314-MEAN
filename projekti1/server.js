/* eslint-disable global-require */
const express = require('express')
const bodyParser = require('body-parser')
const fsPromises = require('fs').promises

const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const data = require('./json_guestbook_data.json')
  res.render('pages/index', { guests: data }) // { guests: data } jotta 'view guestbook'-välilehdessä näkyisi merkintöjen lukumäärä
})
app.get('/guestbook', (req, res) => {
  const data = require('./json_guestbook_data.json')
  res.render('pages/guestbook', { guests: data })
})
app.get('/newmessage', (req, res) => {
  const data = require('./json_guestbook_data.json')
  res.render('pages/newmessage', { guests: data }) // { guests: data } jotta 'view guestbook'-välilehdessä näkyisi merkintöjen lukumäärä
})
app.post('/newmessage', async (req, res) => {
  const json = require('./json_guestbook_data.json')
  console.log(req)
  json.push({
    id: `${json.length + 1}`,
    username: `${req.body.username}`,
    country: `${req.body.country}`,
    date: `${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}`,
    message: `${req.body.message}`,
  })
  try {
    await fsPromises.writeFile('./json_guestbook_data.json', JSON.stringify(json, null, 2))
    console.log(`hoidettu:${json}`)
    res.render('pages/guestbook', { guests: json })
  } catch (e) {
    console.log(e)
  }
})
app.listen(8081)

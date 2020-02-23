/* eslint-disable global-require */
const express = require('express')
const fsPromises = require('fs').promises

const router = express.Router()

router.get('/', (req, res) => {
  const data = require('../json_guestbook_data.json')
  res.render('pages/newmessage', { guests: data }) // { guests: data } jotta 'view guestbook'-välilehdessä näkyisi merkintöjen lukumäärä
})
router.post('/', async (req, res, next) => {
  const json = require('../json_guestbook_data.json')
  json.push({
    id: `${json.length + 1}`,
    username: `${req.body.username}`,
    country: `${req.body.country}`,
    date: `${(new Date()).toLocaleDateString()} ${(new Date()).toLocaleTimeString()}`,
    message: `${req.body.message}`,
  })
  try {
    await fsPromises.writeFile('json_guestbook_data.json', JSON.stringify(json, null, 2))
    res.render('pages/guestbook', { guests: json })
  } catch (e) {
    console.log(e)
    next(e)
  }
})

module.exports = router

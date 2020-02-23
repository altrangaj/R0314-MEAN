const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  // eslint-disable-next-line global-require
  const data = require('../json_guestbook_data.json')
  res.render('pages/index', { guests: data }) // { guests: data } jotta 'view guestbook'-välilehdessä näkyisi merkintöjen lukumäärä
})

module.exports = router

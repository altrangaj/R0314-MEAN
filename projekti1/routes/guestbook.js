const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  // eslint-disable-next-line global-require
  const data = require('../json_guestbook_data.json')
  res.render('pages/guestbook', { guests: data })
})

module.exports = router

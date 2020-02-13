const express = require('express')

const app = express()

app.use(express.static('public/traintimetable/'))

app.listen(8081, () => {
  console.log('...kuuntelee:8081')
})

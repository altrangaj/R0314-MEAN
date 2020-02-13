const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('moikka maailma')
})

app.listen(8081, () => {
  console.log('...kuuntelee:8081')
})

/* eslint-disable global-require */

const express = require('express')
const bodyParser = require('body-parser')
require('express-async-errors')
const fsPromises = require('fs').promises

const app = express()

// app.use(express.static('public/traintimetable/'))

app.use(bodyParser.urlencoded({ extended: true }))
app.get('/adduser', (req, res) => {
  res.sendFile(`${__dirname}/public/adduser.html`)
})
app.post('/adduser', async (req, res) => {
  const json = require('./json_data_set.json')
  let data = ''
  data += `${req.body.name}\n`
  data += `${req.body.email}\n`
  console.log(data)

  json.push({
    Name: req.body.name,
    Email: req.body.email,
  })
  try {
    await fsPromises.writeFile('json_data_set.json', JSON.stringify(json))
    console.log(`hoidettu:${data}`)
    res.send(data)
  } catch (e) {
    console.log(e)
  }
})

app.get('/details', (req, res) => {
  const json = require('./json_data_set.json')
  let result = '<table>'
  json.forEach((element) => {
    result += `
    <tr>
      <td>${element.Name}</td>
      <td>${element.Email}</td>
    </tr>
    `
  })
  result += '</table>'
  res.send(result)
})

app.get('*', (req, res) => {
  res.status(404).send('ei löydy')
})

app.listen(8081, () => {
  console.log('...kuuntelee:8081')
})

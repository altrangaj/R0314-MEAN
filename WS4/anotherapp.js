/* eslint-disable global-require */

const express = require('express')
require('express-async-errors')
const fsPromises = require('fs').promises

const app = express()

// app.use(express.static('public/traintimetable/'))


app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/traintimetable/index2.html`)
})
app.get('/list', (req, res) => {
  res.sendFile(`${__dirname}/example.txt`)
})
app.get('/json', (req, res) => {
  const json = require('./json_data_set.json')
  res.json(json)
})
app.get('/add', async (req, res) => {
  const json = require('./json_data_set.json')
  json.push({
    Name: 'juha',
    Email: 'juha@mail.fi',
  })
  await fsPromises.writeFile('json_data_set.json', JSON.stringify(json))
  res.send('tehty')
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

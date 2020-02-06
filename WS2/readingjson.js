const http = require('http')
const fsPromises = require('fs').promises
const data = require('./sampledata.json')


console.log(data)

data.push({
  name: 'John Doe',
  age: '52',
  compane: 'Laurea',
  address: 'Ratatie 22',
})

console.log(data)

const stringData = JSON.stringify(data, null, 2)
fsPromises.writeFile('dataset.json', stringData)
  .then(() => console.log('file created'))
  .catch((err) => console.log(err))

delete data[6]

console.log(data)

http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/json' })
  response.write(JSON.stringify(data))
  response.end()
}).listen(8081)
console.log('server running: http://127.0.0.1:8081')

const http = require('http')
const data = require('./sampledata.json')

// 9 a)
/*
data.forEach((element) => {
  console.log(element.name)
  console.log(element.age)
  console.log(element.company)
  console.log(element.address)
})
*/

// 9 b)
console.log('<table>')
data.forEach((element) => {
  console.log('<tr>')
  console.log(`  <td>${element.name}</td>`)
  console.log(`  <td>${element.age}</td>`)
  console.log(`  <td>${element.company}</td>`)
  console.log(`  <td>${element.address}</td>`)
  console.log('</tr>')
})
console.log('</table>')

// 10 c)
let html = '<table>'
data.forEach((element) => {
  html += '<tr>'
  html += `<td>${element.name}</td>`
  html += `<td>${element.age}</td>`
  html += `<td>${element.company}</td>`
  html += `<td>${element.address}</td>`
  html += '</tr>'
})
html += '</table>'
http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.write(html)
  response.end()
}).listen(8081)
console.log('server running: http://127.0.0.1:8081')

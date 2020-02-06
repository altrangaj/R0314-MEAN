const http = require('http')
const fsPromises = require('fs').promises

// Serve files to the browser
const write = (filename, response) => {
  fsPromises.readFile(filename)
    .then((result) => {
      response.write(result)
      return response.end()
    })
    .catch((err) => {
      response.statusCode = 400
      return response.end(`error: ${err.message}`)
    })
}

http.createServer((request, response) => {
  switch(request.url) {
  case 'jotain': {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write('jotain')
    break
  }
  case '/': {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write('Nothing here to see')
    break
  }
  case '/frontpage': {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    write('frontpage.html', response)
    break
  }
  case '/contact': {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    write('contact.html', response)
    break
  }
  case '/plaintext': {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    write('example.txt', response)
    break
  }
  case '/json': {
    response.writeHead(200, { 'Content-Type': 'text/json' })
    write('sampledata.json', response)
    break
  }
  default: {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write('hello world')
    response.end()
  }
  }
}).listen(8081)
console.log('server running: http://127.0.0.1:8081')

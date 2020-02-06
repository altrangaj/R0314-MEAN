const axios = require('axios')
const http = require('http')

const search = 'https://dog.ceo/api/breeds/list/all'

const fetchJSON = async (url) => {
  let result
  let error
  try{
    const response = await axios.get(url)
    result = response.data
    return { result, error }
  } catch (err) {
    return { result, error: err }
  }
}
const randomDogs = async (amount) => {
  const { result, error } = await fetchJSON(search)
  if(error) throw Error(error)
  const promises = []
  for(let i = 0; i < amount; i++) {
    const breeds = Object.keys(result.message)
    const index = Math.floor(Math.random() * breeds.length)
    const tulos = fetchJSON(`https://dog.ceo/api/breed/${breeds[index]}/images/random`)
    promises.push(tulos)
    delete result.message[breeds[index]]
  }
  const selected = await Promise.all(promises)
  return selected
}
http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
  randomDogs(8).then((result) => {
    const arr = result.map((e) => e.result.message)
    let html = '<body style="background:black;">'
    for(let i = 0; i < arr.length; i++) {
      html += `<img src=${arr[i]} alt="Smiley face" style="width:25%;display:inline-block;">`
    }
    response.write((`${html}</body>`))
    response.end()
  }).catch((error) => {
    response.statusCode = 400
    return response.end(error.message)
  })
}).listen(8081)
console.log('server running: http://127.0.0.1:8081')

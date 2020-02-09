const http = require('http')
const axios = require('axios')

const fetchJSON = (url) => new Promise(function loop(resolve, reject) {
  axios.get(url).then((data) => resolve(data)).catch((error) => {
    console.log('fetchJSON     ################ >', error.code, error.syscall, error.address, error.port)
    loop.bind(null, resolve, reject)
  })
})

const search = 'https://dog.ceo/api/breeds/list/all'

const randomDogs = async (amount) => {

  let breeds
  const promises = []
  let index
  const result = await fetchJSON(search)

  function fetchDogPicURL() {
    breeds = Object.keys(result.data.message)
    index = Math.floor(Math.random() * breeds.length)
    return axios.get(`https://dog.ceo/api/breed/${breeds[index]}/images/random`)
      .then((data) => Promise.resolve(data))
      .catch((error) => {
        console.log('fetchDogPicURL----------------->', error.message, error.errno)
        delete result.data.message[breeds[index]]
        return fetchDogPicURL()
      })
  }
  for(let i = 0; i < amount; i++) {
    const tulos = fetchDogPicURL()
    if(tulos) promises.push(tulos)
    delete result.data.message[breeds[index]]
  }
  const selected = await Promise.all(promises)
  if(selected.length > 0)
    return selected.filter((item) => item !== undefined).map((item) => item.data.message)
  console.log(selected)
  return null
}

const server = () => http.createServer(async (request, response) => {
  try{
    response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })

    // eslint-disable-next-line no-await-in-loop
    const arr = await randomDogs(12)

    let html = `
    <head>
    <script>
      const waitimages = () => {
        let j = 0
        const imgs = document.getElementsByClassName('image')
        const preloadImage = (url) => {
          let img=new Image()
          img.src=url
          img.onerror = () => window.location.reload()
          img.onload = () => { 
            j++
            if(j == imgs.length){ 
              document.body.style.opacity = '1'
              setTimeout(() => window.location.reload(),5000)
            }
          }
        }
        for(const i of imgs) preloadImage(i.src)
      }
    </script>
    </head>
    <body onload="waitimages()" style="opacity:0;background:black;
    transition: opacity 400ms;transition-timing-function:ease-in;
    display:flex;flex-wrap:wrap; align-items:center;overflow:hidden;
    justify-content:center;">`
    for(let i = 0; i < arr.length; i++) {
      const url = arr[i]
      html += `
      <div style="width:fit-content;height:fit-content;text-align:center;">
        <div style='position:relative;top:0.95em; font-size:1.3em;line-height:1em;'>
            <div style="display:inline-block;border-radius:0 0 5px 5px;background-color:rgba(50,50,50,0.8);">
                <span style="padding:0 0.2em 0 0.2em;color:white;">
                ${url.split('/', 5)[4]}
                </span>
            </div>
        </div>
        <img class="image" src=${url} alt="koira" 
        style="min-width:15vw;max-width:24vw;min-height:20vh;max-height:32vh;"> 
      </div>`
    }
    response.write((`${html}</body>`))
    response.end()
  } catch (error) {
    console.log(error)
    if(error.code === 'ETIMEDOUT' || error.message === 'ETIMEDOUT') server().close(() => server())
    response.statusCode = 400
    response.write(`
    <head><script>setTimeout(() => window.location.reload(),2500)
    </script></head><body style="background:black;display:flex;flex-wrap:wrap; align-items:center;
    justify-content:center;"><span style="color:yellow;font-size:3em;">oops....wait few seconds.</span></body>`)
  }
  response.end()
}).listen(8081)

console.log('server running: http://127.0.0.1:8081')

server()

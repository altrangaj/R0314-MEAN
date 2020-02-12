const http = require('http')
const axios = require('axios')

const PORT = process.env.PORT || 8081

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
        delete result.data.message[breeds[index]] // jokainen kuva on omaa rotuaan
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

    const arr = await randomDogs(15)

    let html = `
    <head>
      <link href="https://fonts.googleapis.com/css?family=Russo+One&display=swap" rel="stylesheet"> 
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
    <body onload="waitimages()" style='
    opacity:0;
    background:black;
    margin-left:0;
    width:100vw;height:100vh;
    transition: opacity 400ms;
    transition-timing-function:ease-in;
    overflow:hidden;'>
      <div style="
      position:fixed;
      top:0;left:0;
      width:calc(98vw - 2*(0.4vw + 0.4vh + 2px));
      height:calc(100vh - 2*(0.4vw + 0.4vh + 2px));
      padding:0 1vw 0 1vw;
      border:solid calc(0.4vw + 0.4vh + 2px) red;
      display:flex;
      flex-wrap:wrap;
      align-content:flex-start;
      flex-direction:row;
      align-items:flex-start;
      justify-content:center;">`
    for(let i = 0; i < arr.length; i++) {
      const url = arr[i]
      html += `
        <div style="
        width:fit-content;
        height:33.333vh;
        margin: 0 calc(0.4vw + 0.4vh + 2px) 0 0;">
          <div style='
          position:relative;
          top:1em;
          height:fit-content;
          font-size: calc(1.2vh + 0.2vw);
          line-height:1em;
          margin-top:-1em;'>
            <div style="
            display:inline-block;
            float:left;
            text-align:left;
            border-bottom:solid 0.083em black;
            border-radius:0 0 0.333em 0;
            background-color:black;">
              <span style="padding:0 0.2em 0 0em;font-family: 'Russo One', sans-serif;color:#a9bfd6">
                ${url.split('/', 5)[4]}
              </span>
            </div>
          </div>
        <img class="image" src=${url} alt="koira" 
        style="height:calc(33.333vh - (.4vw + .4vh + 2px));">
      </div>`
    }
    html += `<div style="
    z-index:200;
    position:fixed;
    top:0;left:0;
    width:calc(100vw - 2*(0.4vw + 0.4vh + 2px));
    height:calc(100vh - 2*(0.4vw + 0.4vh + 2px));
    border:solid calc(0.4vw + 0.4vh + 2px) black;"></div>`
    response.write((`${html}</body>`))
    response.end()
  } catch (error) {
    console.log(error)
    if(error.code === 'ETIMEDOUT' || error.message === 'ETIMEDOUT') server().close(server)
    response.statusCode = 400
    response.write(`
    <head><script>setTimeout(() => window.location.reload(),2500)
    </script></head><body style="background:black;display:flex;flex-wrap:wrap; align-items:center;
    justify-content:center;"><span style="color:yellow;font-size:3em;">oops....wait few seconds.</span></body>`)
  }
  response.end()
}).listen(PORT)

console.log('server running: http://127.0.0.1:8081')

server()

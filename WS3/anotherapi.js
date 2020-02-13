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
                setTimeout(() => window.location.reload(),20000)
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
    margin:0 0 0 0;
    font-size: calc(.3vh + .3vw + 3px);
    width:100%;height:100%;
    transition: opacity 400ms;
    transition-timing-function:ease-in;
    overflow:hidden;'>
      <div style="
      position:fixed;
      top:0;left:0;
      width:calc(100% - 2em);
      height:calc(100% - 2em);
      border:solid 1em transparent;
      display:flex;
      margin-top:-0.15em;
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
        text-align:center;
        height:calc(100vh/3 - 1em/3);
        margin: 0 1em 0 0;">
          <div style='
          position:relative;
          top:1em;
          height:fit-content;
          font-size: calc(.7vh + .5vw + 3px);
          line-height:1em;
          margin-top:-1em;'>
            <div style="
            display:inline-block;
            float:left;
            text-align:left;
            border-bottom:solid .085em black;
            border-radius:0 0 .333em 0;
            background-color:black;">
              <span style="padding:0 .2em 0 0em;font-family: 'Russo One', sans-serif;color:#a9bfd6">
                ${url.split('/', 5)[4]}
              </span>
            </div>
          </div>
        <img class="image" src=${url} alt="koira" 
        style="border-radius:1em;height:calc(100vh/3 - 4em/3);">
      </div>`
    }
    response.write((`${html} <div style="
    position:absolute;
    bottom: 0;
    z-index:100;
    width:calc(100% + 4em);
    height:1em;
    margin:-1.2em;
    background:black;"></div></body>`))
    response.end()
  } catch (error) {
    console.log(error)
    response.statusCode = 400
    response.end()
    server().close(server)
  }
}).listen(PORT)

server()
console.log('server running: http://127.0.0.1:8081')

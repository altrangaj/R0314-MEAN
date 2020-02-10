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

    // eslint-disable-next-line no-await-in-loop
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
    <body onload="waitimages()" style='opacity:0;background:black;width:98vw;height:100vh;
    transition: opacity 400ms;transition-timing-function:ease-in;overflow:hidden;margin:auto;'>
    <div style="width:100%;height:100vh;padding-top:calc(0.6vw + 2px);
    display:flex;flex-wrap:wrap; flex-direction:row;align-items:center;
    justify-content:center;margin:0;">
    `
    for(let i = 0; i < arr.length; i++) {
      const url = arr[i]
      html += `
      <div style="width:fit-content;height:fit-content;text-align:center;margin: -15px calc(0.6vw + 2px) calc(0.6vw + 2px) 0;">
        <div style='position:relative;top:12px; font-size: 12px;line-height:12px'>
        <div style="display:inline-block;float:left;text-align:left;border-bottom:solid 1px black;border-radius:0 0 4px 0;background-color:black;">
                <span style="z-index:8;padding:0 0.2em 0 0em;font-family: 'Russo One', sans-serif;color:#a9bfd6">${url.split('/', 5)[4]}</span>
            </div>
        </div>
        <img class="image" src=${url} alt="koira" 
        style="height:calc(33.333vh - 0.6vw - 2px);"> 
      </div>`
    }
    html += `</div><div style="z-index:100;position:absolute;display:block;bottom:0px;width:100vw;
    margin-bottom:-5px; padding:0;height: calc(0.6vw + 5px);background-color: black;">tdhguj</div>`
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

const http = require('http')
const fetchJSON = require('./fetch')

const search = 'https://dog.ceo/api/breeds/list/all'

const randomDogs = async (amount) => {
  const { result, error } = await fetchJSON(search)
  if(error) {
    if(error.name === 'ETIMEDOUT') randomDogs(amount)
    else throw Error(error)
    return
  }
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

http.createServer(async (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
  try {
    let arr
    do{
      // eslint-disable-next-line no-await-in-loop
      arr = await randomDogs(12)
    } while(!arr || arr.find((r) => !r.result || r.result.error))
    let html = `
    <head>
    <script>
      setTimeout(() => window.location.reload(),5000)
      const waitimages = () => {
        let j = 0
        const imgs = document.getElementsByClassName('image')
        const preloadImage = (url) => {
          let img=new Image()
          img.src=url
          img.onerror = () => window.location.reload()
          img.onload = () => { 
            j++
            if(j == imgs.length) document.body.style.opacity = '1' }
        }
        for(const i of imgs) preloadImage(i.src)
      }
    </script>
    </head>
    <body onload="waitimages()" style="opacity:0;background:black;
    transition: opacity 400ms;transition-timing-function:ease-in;
    display:flex;flex-wrap:wrap; align-items:center;
    justify-content:center;">`
    for(let i = 0; i < arr.length; i++) {
      const url = arr[i].result.message
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
        style="min-width:15vw;max-width:25vw;min-height:20vh;max-height:33vh;"> 
      </div>`
    }
    response.write((`${html}</body>`))
    response.end()
  } catch(error) {
    response.statusCode = 400
    console.log(error)
    return response.end(error.message)
  }
}).listen(8081)
console.log('server running: http://127.0.0.1:8081')

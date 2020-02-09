/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const http = require('http')
const axios = require('axios')

const search = 'http://www.omdbapi.com/?t=breaking+bad&plot=full&apikey=6bc2668d'

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

http.createServer(async (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
  const { result, error } = await fetchJSON(search)
  if(error) {
    response.statusCode = 400
    return response.end(error.message)
  }

  const {
    Poster, Title, Writer, Actors, Plot, Awards, Metascore, Ratings, ...rest
  } = result
  let headers = '<tr style="background:rgba(0,0,0,0.5); color:#b3ffd9;">'
  let values = '<tr style="background:rgba(153, 255, 204,.7); color:black;">'
  for (const property in rest) {
    headers += `<td style="padding:0 0.3em 0 0.3em;">${property}</td>`
    values += `<td style="padding:0 0.3em 0 0.3em;">${rest[property]}</td>`
  }
  headers += '</tr>'
  values += '</tr>'

  response.write(`
    <head>
      <style>td{width:fit-content;white-space:nowrap;}</style>
    </head>
    <body style="
      background-image:url('${Poster}');
      background-repeat:no-repeat;
      background-color:black;
      background-size:cover;
      overflow:hidden;
      width:100%;
      height:100vh;">
      <table style="
        color:black;
        position:relative;
        top:15%;
        margin:auto;
        font-size:1.8em;
        font-weight:700;
        text-shadow:-2px 0 #ccffeb, 0 2px #ccffeb, 2px 0 #ccffeb, 0 -2px #ccffeb;">
        <tr>
          <td>&#8226;</td>
          <td>${Title}</td><td>&#8226;</td>
          <td>${Writer}</td><td>&#8226;</td>
          <td>${Actors}</td><td>&#8226;</td>
        </tr>
      </table>
      <div style="
        text-shadow:-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
        color:#ccffeb;
        position:relative;
        background:rgba(0,0,0,0.5);
        padding:0.3em;
        top:35%;
        border-top:1px solid #ccffeb;
        border-bottom:1px solid #ccffeb;
        font-size:1.5em;
        margin:auto;
        width:70%;">
          ${Plot}
      </div>
      <div style="
        position:absolute;
        width:100%;
        bottom:5%;
        text-align:center;
        display:flex;
        justify-content:center;">
        <table style="display:inline-block;color:white;text-align:center;">
          ${headers.concat(values)}
        </table>
      </div>
    </body>`)
  response.end()
}).listen(8081)
console.log('server running: http://127.0.0.1:8081')

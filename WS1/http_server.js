let http = require('http')

http.createServer((request,response) => {
	response.writeHead(200, {'Content-Type': 'text/html'})
	response.write(`
	<table>
	<style>
	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	  }
	  
	  td, th {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	  }
	  
	  tr:nth-child(even) {
		background-color: #dddddd;
	  }
	</style>
	<tr>
	  <th>Company</th>
	  <th>Contact</th>
	  <th>Country</th>
	</tr>
	<tr>
	  <td>Alfreds Futterkiste</td>
	  <td>Maria Anders</td>
	  <td>Germany</td>
	</tr>
	<tr>
	  <td>Centro comercial Moctezuma</td>
	  <td>Francisco Chang</td>
	  <td>Mexico</td>
	</tr>
  </table>`)
	response.end('haloo maailma\n')
}).listen(8081)
console.log('server running: http://127.0.0.1:8081')
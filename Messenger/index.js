'use strict'

const http = require('http')
const port = process.env.PORT || 8000

const server = http.createServer((request, response) => {
	response.statusCode = 200
	response.setHeader('Content-Type', 'text/plain')
	response.end('Helllo World\n')
})

server.listen(port, () => {
  console.log('JavaScript Tips Bot is listening on port', port);
});
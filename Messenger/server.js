'use strict'

const http = require('http')
const url = require('url')

const utils = require('./utils')
const bot = require('./bot')

const port = process.env.PORT || 8000

const server = http.createServer((request, response) => {
	response.statusCode = 200
	response.setHeader('Content-Type', 'text/plain')

	if(request.url === '/favicon.ico') {
		response.end()
		return
	}

	let query = utils.getUrlQuery(request.url)

	console.log(query)
	response.end('Helllo World\n')
})

server.listen(port, () => {
  bot.logMessage('JavaScript Tips Bot is alive, waiting for Zuckerberg requests...')
});
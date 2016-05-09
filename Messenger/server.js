'use strict'

const http = require('http')
const url = require('url')

const utils = require('./utils')
const bot = require('./bot')

const port = process.env.PORT || 8000

const server = http.createServer((request, response) => {
	response.statusCode = 200
	response.setHeader('Content-Type', 'text/plain')

	if(request.url !== '/favicon.ico') {
		let query = utils.getUrlQuery(request.url)
		response.end('Helllo World\n')
	}

	response.end()
})

server.listen(port, () => {
  bot.logMessage('JavaScript Tips Bot is alive, waiting for Zuckerberg requests...')
});
'use strict'

const http = require('http')
const url = require('url')

const utils = require('./utils')
const bot = require('./bot')

const port = process.env.PORT || 8000

const server = http.createServer((request, response) => {
	
	response.statusCode = 200
	response.setHeader('Content-Type', 'text/plain')

	let query = utils.getUrlQuery(request.url)

	if (!utils.validFBConnection(response, query))
		return

	response.end(query['hub.challenge'])
})

server.listen(port, () => {
  bot.logMessage('JavaScript Tips Bot is alive, waiting for Zuckerberg requests...')
});
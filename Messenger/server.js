'use strict'

const http = require('http')
const url = require('url')
const fs = require('fs')

const Message = require('./message')
const utils = require('./utils')
const bot = require('./bot')

if (fs.existsSync('.env'))
    require('dotenv').config()

const port = process.env.PORT || 8000

const server = http.createServer((request, response) => {

    response.statusCode = 200

    if (request.method === 'GET') {
        response.setHeader('Content-Type', 'text/plain')

        let query = utils.getUrlQuery(request.url)

        if (!utils.validFBConnection(response, query))
            return

        response.end(query['hub.challenge'])
    }

    else if (request.method === 'POST') {
        let json = ''

        request.on('data', (chunk) => {
            json += chunk
        })

        request.on('end', () => {

            console.log(json)

            json = JSON.parse(json)

            let message = new Message(json)

            if (!message.isWelcome()) {

                let text = message.text

                if (text)
                    text = text.toUpperCase()

                switch (text) {
                    case 'TODAY':
                        bot.giveTodayTip(message)
                        break
                    case 'RANDOM':
                        bot.giveRandomTip(message)
                        break
                    case 'ABOUT':
                        bot.giveAboutInfo(message)
                        break
                    case text === 'HELP':
                        bot.giveLongHelp(message)
                        break
                    default:
                        bot.giveShortHelp(message)
                }
            }

            response.end()
        })
    }

})

server.listen(port, () => {
  bot.logMessage('JavaScript Tips Bot is alive, waiting for Zuckerberg requests...')
});
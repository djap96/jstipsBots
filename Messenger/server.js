'use strict'

const http = require('http')
const url = require('url')

const Message = require('./message')
const utils = require('./utils')
const bot = require('./bot')

require('dotenv').config()

const PORT = process.env.PORT || 8000

const server = http.createServer((req, response) => {

    response.statusCode = 200

    if (req.method === 'GET') {
        response.setHeader('Content-Type', 'text/plain')

        let query = utils.getUrlQuery(req.url)

        if (!utils.validFBConnection(response, query))
            return

        response.end(query['hub.challenge'])
    }

    else if (req.method === 'POST') {
        let json = ''

        req.on('data', (chunk) => {
            json += chunk
        })

        req.on('end', () => {

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
                    case 'HELP':
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

server.listen(PORT, () => {
  bot.logMessage('JavaScript Tips Bot is alive, waiting for Zuckerberg requests...')
})
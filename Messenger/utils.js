'use strict'

const url = require('url')
const cheerio = require('cheerio')
const request = require('request')

const bot = require('./bot')

const LISTURL = "https://github.com/loverajoel/jstips/blob/gh-pages/README.md"

const validFBConnection = (response, query)  => {

    if (!query['hub.verify_token'] || query['hub.verify_token'] !== process.env.VERIFY_TOKEN) {
        response.end('No valid facebook verify token!')
        return false
    }

    if (query['hub.mode'] !== 'subscribe') {
        response.end('No valid hub method!')
        return false
    }

    return true
}

const getUrlQuery = (request_url) => {
    let params = url.parse(request_url, true)
    let query = params.query

    return query
}

const getTipListAsync = (callback) => {

    request(LISTURL, (err, res, body) => {
        if (err) {
            bot.logMessage('Something happend at request tip lists', err)
            return
        }

        if (res.statusCode !== 200) {
            bot.logMessage('Github is down!?!?, Status Code: ' + res.statusCode)
            return
        }

        let $ = cheerio.load(body)
        let list = $('h1:contains(Tips list)').next()
        list = list.children()

        callback(undefined,list)
    })
}

module.exports.getUrlQuery = getUrlQuery
module.exports.validFBConnection = validFBConnection
module.exports.getTipListAsync = getTipListAsync
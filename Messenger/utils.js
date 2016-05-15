'use strict'

const url = require('url')

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

module.exports.getUrlQuery = getUrlQuery
module.exports.validFBConnection = validFBConnection
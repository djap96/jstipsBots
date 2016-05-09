'use strict'

const url = require('url')

const getUrlQuery = function(request_url) {
	let params = url.parse(request_url, true)
	let query = params.query

	return query
}

module.exports.getUrlQuery = getUrlQuery
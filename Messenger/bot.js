'use strict'

const moment = require('moment')

const logMessage = (message, element) => {
	let now = moment()
	let now_str = now.format('MMM DD HH:mm:SS')

	console.log('JSMB[' + now_str + ']: ' + message)

	if (element) {
  		console.log('='.repeat(process.stdout.columns))
	    console.log(element)
  		console.log('='.repeat(process.stdout.columns))
	}
}

module.exports.logMessage = logMessage
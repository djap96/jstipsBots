'use strict'

const FB_GRAPH_URL = 'https://graph.facebook.com/v2.6/'
const GRAPH_MESSAGE_URL = FB_GRAPH_URL + 'me/messages?access_token='

const request = require('request')
const moment = require('moment')
const Message = require('./message')

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

const sendMessage = (text, user_id) => {
    let urlll = GRAPH_MESSAGE_URL + process.env.PAGE_TOKEN

    request({
        url: urlll,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json"'
        },
        form: {
            'recipient': {
                'id': user_id
            },
            'message': {
                'text': text
            }
        }
    })
}

const giveTodayTip = (message) => {
    logMessage(message.user_id + " => " + message.text)
    sendMessage("Today tip will be available soon!", message.user_id)
}

const giveRandomTip = (message) => {
    logMessage(message.user_id + " => " + message.text)
    sendMessage("Random tip will be available soon!", message.user_id)
}

const giveAboutInfo = (message) => {
    logMessage(message.user_id + " => " + message.text)
    sendMessage('This is an open source proyect, '
        + 'feel free to collaborate or send feedback!', message.user_id)
}

const giveShortHelp = (message) => {
    logMessage(message.user_id + " => " + message.text)
    sendMessage("Text me: today, random, about or help", message.user_id)
}

const giveLongHelp = (message) => {
    logMessage(message.user_id + " => " + message.text)
    sendMessage("long help is not ready yet!", message.user_id)
}

module.exports.logMessage = logMessage
module.exports.giveTodayTip = giveTodayTip
module.exports.giveRandomTip = giveRandomTip
module.exports.giveAboutInfo = giveAboutInfo
module.exports.giveShortHelp = giveShortHelp
module.exports.giveLongHelp = giveLongHelp
module.exports.sendMessage = sendMessage
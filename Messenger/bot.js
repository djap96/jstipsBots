'use strict'

const FB_GRAPH_URL = 'https://graph.facebook.com/v2.6/'
const GRAPH_MESSAGE_URL = FB_GRAPH_URL + 'me/messages?access_token='

const request = require('request')
const moment = require('moment')

const Message = require('./message')
const utils = require('./utils')

var user_id

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
    let send__message_url = GRAPH_MESSAGE_URL + process.env.PAGE_ACCES_TOKEN

    request({
        url: send__message_url,
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

function sendTipLink(tip) {
        let tip_link = tip.children[1].attribs.href
        sendMessage(tip_link, user_id)
}

const giveTodayTip = function(message, tip_list) {

    //There is no tip_link yet
    if(!tip_list) {
        utils.getTipListAsync(giveTodayTip)
        user_id = message.user_id
        logMessage(user_id + " => " + message.text)
    }
    else {
        let last_tip = tip_list[0]
        sendTipLink(last_tip)
    }

}

const giveRandomTip = (message, tip_list) => {

    //There is no tip_link yet
    if(!tip_list) {
        utils.getTipListAsync(giveRandomTip)
        user_id = message.user_id
        logMessage(message.user_id + " => " + message.text)
    }
    else {
        let number_of_tips = tip_list.length
        let number_rand = Math.floor(Math.random() * number_of_tips)
        number_rand = ('0' + number_rand).slice(-2)

        tip_list.each(function(i, element) {
            if (element.children[0].data.indexOf(number_rand) !== -1) {
                sendTipLink(element)
                return false
            }
        })
    }
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
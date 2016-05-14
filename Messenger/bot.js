'use strict'

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

const giveTodayTip = (json) => {
    let message = new Message(json)

    logMessage(message.user_id + " => " + message.text)
    logMessage("TODAY TIP!!")
}

const giveRandomTip = (json) => {
    let message = new Message(json)

    logMessage(message.user_id + " => " + message.text)
    logMessage("RANDOM TIP!!")
}

const giveAboutInfo = (json) => {
   let message = new Message(json)

    logMessage(message.user_id + " => " + message.text)
    logMessage("ABOUT INFO!!")
}

const giveShortHelp = (json) => {
    let message = new Message(json)

    logMessage(message.user_id + " => " + message.text)
    logMessage("SHORT HELP!!")
}

const giveLongHelp = (json) => {
    let message = new Message(json)

    logMessage(message.user_id + " => " + message.text)
    logMessage("LONG HELP!!")
}

module.exports.logMessage = logMessage
module.exports.giveTodayTip = giveTodayTip
module.exports.giveRandomTip = giveRandomTip
module.exports.giveAboutInfo = giveAboutInfo
module.exports.giveShortHelp = giveShortHelp
module.exports.giveLongHelp = giveLongHelp
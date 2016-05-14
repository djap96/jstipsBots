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

const giveTodayTip = (json) => {
    let entry_messaging = json.entry[0].messaging
    let user_id = entry_messaging[0].sender.id

    logMessage("TODAY TIP!!")
}

const giveRandomTip = (json) => {
    let entry_messaging = json.entry[0].messaging
    let user_id = entry_messaging[0].sender.id

    logMessage("RANDOM TIP!!")
}

const giveAboutInfo = (json) => {
    let entry_messaging = json.entry[0].messaging
    let user_id = entry_messaging[0].sender.id

    logMessage("ABOUT INFO!!")
}

const giveShortHelp = (json) => {
    let entry_messaging = json.entry[0].messaging
    let user_id = entry_messaging[0].sender.id

    logMessage("SHORT HELP!!")
}

const giveLongHelp = (json) => {
    let entry_messaging = json.entry[0].messaging
    let user_id = entry_messaging[0].sender.id

    logMessage("LONG HELP!!")
}

module.exports.logMessage = logMessage
module.exports.giveTodayTip = giveTodayTip
module.exports.giveRandomTip = giveRandomTip
module.exports.giveAboutInfo = giveAboutInfo
module.exports.giveShortHelp = giveShortHelp
module.exports.giveLongHelp = giveLongHelp
'use strict';

const Bot = require('./bot');

class UserMessage {
    constructor(message_json) {
        let entry_messaging = message_json.entry[0].messaging;

        this.message_json = message_json;
        this.user_id = entry_messaging[0].sender.id;

        if (entry_messaging[0].message);
            this.text = entry_messaging[0].message.text;
    }

    isWelcome() {
        let entry_messaging = this.message_json.entry[0].messaging;

        if (entry_messaging[0].delivery)
            return true;

        return false;
    }
}

function handleMessage(message_data, res) {
    //message_json binded
    let message_json = JSON.parse(message_data);
    let user_message = new UserMessage(message_json);

    //User open the chat for the first time
    if (user_message.isWelcome()){
        res.end();
        return;
    }

    let bot = new Bot();
    bot.chat.receiver = user_message.user_id;
    bot.chat.text = user_message.text;

    //User sends image, video, audio...
    if (!bot.chat.text) {
        bot.giveShortHelp();
        res.end();
        return;
    }

    let text = bot.chat.text.toUpperCase();
    switch (text) {
        case 'TODAY':
            bot.giveTodayTip();
            break;
        case 'RANDOM':
            bot.giveRandomTip();
            break;
        case 'ABOUT':
            bot.giveAboutInfo();
            break;
        case 'HELP':
            bot.giveLongHelp();
            break;
        default:
            bot.giveCustomInfo();
    }

    res.end();
}

module.exports.UserMessage = UserMessage;
module.exports.handleMessage = handleMessage;
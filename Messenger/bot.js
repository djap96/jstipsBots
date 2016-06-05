'use strict';

const FB_GRAPH_URL = 'https://graph.facebook.com/v2.6/';
const GRAPH_MESSAGE_URL = FB_GRAPH_URL + 'me/messages?access_token=';

const request = require('request');
const moment = require('moment');

const Chat = require('./chat');
const utils = require('./utils');

function sendTipLink(tip) {
    let tip_link = tip.children[1].attribs.href;
    sendMessage(tip_link, user_id);
}

function sendMessage(text, user_id) {
        let send_message_url = GRAPH_MESSAGE_URL + process.env.PAGE_ACCESS_TOKEN;

        request({
            url: send_message_url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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

class Bot {
    constructor() {
        this.chat = new Chat();
    }

    static log(message, element) {
        let now = moment();
        let now_str = now.format('MMM DD HH:mm:SS');

        console.log('JSMB[' + now_str + ']: ' + message);

        if (element) {
            console.log('='.repeat(process.stdout.columns));
            console.log(element);
            console.log('='.repeat(process.stdout.columns));
        }
    }

    giveAboutInfo() {
        logMessage(message.user_id + " => " + message.text);
        sendMessage('This is an open source proyect, '
            + 'feel free to collaborate or send feedback!', message.user_id);
    }

    giveShortHelp() {
        Bot.log(this.chat.receiver + " => " + this.chat.text);
        sendMessage("Text me: today, random, about or help", this.chat.receiver);
    }

    giveLongHelp() {
        logMessage(message.user_id + " => " + message.text);
        sendMessage("long help is not ready yet!", message.user_id);
    }

    giveTodayTip() {

        //There is no tip_link yet
        if(!tip_list) {
            utils.getTipListAsync(giveTodayTip);
            user_id = message.user_id;
            logMessage(user_id + " => " + message.text);
        }
        else {
            let last_tip = tip_list[0];
            sendTipLink(last_tip);
        }
    }

    giveRandomTip() {

        //There is no tip_link yet
        if(!tip_list) {
            utils.getTipListAsync(giveRandomTip);
            user_id = message.user_id;
            logMessage(message.user_id + " => " + message.text);
        }
        else {
            let number_of_tips = tip_list.length;
            let number_rand = Math.floor(Math.random() * number_of_tips);
            number_rand = ('0' + number_rand).slice(-2);

            tip_list.each(function(i, element) {
                if (element.children[0].data.indexOf(number_rand) !== -1) {
                    sendTipLink(element);
                    return false;
                }
            })
        }
    }

    giveCustomInfo() {this.giveShortHelp();}
}

module.exports = Bot;
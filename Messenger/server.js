'use strict';

const http = require('http');
const url = require('url');

const Bot = require('./bot');
const Message = require('./userMessage').Message;
const handleMessage = require('./userMessage').handleMessage;
const utils = require('./utils');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {

    res.statusCode = 200;

    //Messenger will get the disponibility of our server
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'text/plain');
        let query = utils.getUrlQuery(req.url);

        if (!utils.isValidFbConnection(res, query))
            return;

        res.end(query['hub.challenge']);
    }

    //Messenger will post user messages here
    else if (req.method === 'POST') {
        let message_data = '';

        req.on('data', (chunk) => {
            message_data += chunk;
        }).on('end', () => { handleMessage(message_data, res); });
    }

});

server.listen(PORT, () => {
  Bot.log('JavaScript Tips Bot is alive, waiting for Zuckerberg requests...')
});
'use strict'

class Message {
    constructor(json){
        let entry_messaging = json.entry[0].messaging
        this.user_id = entry_messaging[0].sender.id

        if (entry_messaging[0].message)
            this.text = entry_messaging[0].message.text
    }
}

module.exports = Message
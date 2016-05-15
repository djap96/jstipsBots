'use strict'

class Message {
    constructor(json) {

        let entry_messaging = json.entry[0].messaging

        this.json = json
        this.user_id = entry_messaging[0].sender.id

        if (entry_messaging[0].message)
            this.text = entry_messaging[0].message.text
    }

    isWelcome() {
        let entry_messaging = this.json.entry[0].messaging

        if (entry_messaging[0].delivery)
            return true

        return false
    }
}

module.exports = Message
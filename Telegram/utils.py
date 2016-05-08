"""Array manipulation and other utils"""


def get_message_type(message):
    """Get the type of the message that was send to jstipBot"""
    if 'text' not in message:
        return 'NO_TEXT'
    elif 'entities' not in message:
        return 'NO_COMMAND'
    else:
        for entity in message['entities']:
            if entity['type'] == 'bot_command':
                return 'COMMAND'
        else:
            return 'NO_COMMAND'


def get_command(message):
    """Extract and returns the command from message"""
    text = message['text']

    for entity in message['entities']:
        if entity['type'] == 'bot_command':
            start = entity['offset'] + 1
            end = start + entity['length'] - 1

            return text[start:end]

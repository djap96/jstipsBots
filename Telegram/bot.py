"""jstipsBot actions"""

import datetime
import requests
import shutil

import settings


def __console_width():
    (width, height) = shutil.get_terminal_size((80, 20))
    return width


def __bad_conection(request):
    request_json = request.json()

    if not request_json['ok']:
        log_message("Connection to Telegram failed!", request_json)


def __url(method):
    """Returns a full url to Telegram Api"""
    return settings.API_URL + settings.API_TOKEN + '/' + method


def log_message(message, element=None):
    """Logs messages, warnings, errors"""
    now = datetime.datetime.now()
    now_str = now.strftime('%b %d %H:%M:%S')

    print('JSTB[' + now_str + ']: ' + message)

    if(element != None):
        print('=' * __console_width())
        print(str(element))
        print('=' * __console_width())


def get_user_messages(updates_offset):
    """Get a json of all the messages received by Telegramchat"""
    request = requests.post(__url('getUpdates'), data={
                            'offset': updates_offset})

    if __bad_conection(request):
        return None

    request_json = request.json()

    return request_json


def say_hello(message):
    """Gives a warming welcome message"""
    chat_id = message['chat']['id']
    user = message['from']

    username = user['first_name'] + ' ' + user['last_name']
    log_message('HELLO from ' + username)

    welcome_message = 'Hi ' + user['first_name'] + '!'

    requests.post(
        __url('sendMessage'),
        data={
            'chat_id': chat_id,
            'text': welcome_message
        }
    )


def say_no_command(message):
    """Let the user know that command doesn't exist"""
    chat_id = message['chat']['id']
    no_command_message = 'I can\'t handle that command'

    requests.post(
        __url('sendMessage'),
        data={
            'chat_id': chat_id,
            'text': no_command_message
        }
    )


def say_cant_talk(message):
    """Let the bot only accepts commands"""
    chat_id = message['chat']['id']
    cant_talk_message = 'At the momment I only work properly with commands'

    requests.post(
        __url('sendMessage'),
        data={
            'chat_id': chat_id,
            'text': cant_talk_message
        }
    )


def give_random_tip(message):
    """Give a pseudo-random tip"""
    chat_id = message['chat']['id']

    user = message['from']
    username = user['first_name'] + ' ' + user['last_name']

    log_message(username + ' took a RANDOM TIP')
    feature_message = '[Random Tip] feature will be available soon'

    requests.post(
        __url('sendMessage'),
        data={
            'chat_id': chat_id,
            'text': feature_message
        }
    )


def give_today_tip(message):
    """Give a pseudo-random tip"""
    chat_id = message['chat']['id']

    user = message['from']
    username = user['first_name'] + ' ' + user['last_name']

    log_message(username + ' took a TODAY TIP')
    feature_message = '[Today tip] feature will be available soon'

    requests.post(
        __url('sendMessage'),
        data={
            'chat_id': chat_id,
            'text': feature_message
        }
    )

"""jstipsBot actions"""

import datetime
import requests
import shutil

import settings


def __console_width():
    (width, height) = shutil.get_terminal_size((80, 20))
    return width


def log_message(message, element=None):
    """Logs messages, warnings, errors"""
    now = datetime.datetime.now()
    now_str = now.strftime('%b %d %H:%M:%S')

    print('JSTB[' + now_str + ']: ' + message)

    if(element != None):
        print('=' * __console_width())
        print(str(element))
        print('=' * __console_width())


def __bad_conection(request):
    request_json = request.json()

    if not request_json['ok']:
        log_message("Connection to Telegram failed!", request_json)


def __url(method):
    """Returns a full url to Telegram Api"""
    return settings.API_URL + settings.API_TOKEN + '/' + method


def get_user_messages(updates_offset):
    """Get a json of all the messages received by Telegramchat"""
    request = requests.post(__url('getUpdates'), data={
                            'offset': updates_offset})

    if __bad_conection(request):
        return None

    request_json = request.json()

    return request_json


def say_hello(chat_id, chat_subject):
    """Gives a warming welcome message"""

    user = chat_subject['first_name']
    welcome_message = 'Hello ' + user + '!'

    requests.post(
        __url('sendMessage'),
        data={
            'chat_id': chat_id,
            'text': welcome_message
        }
    )

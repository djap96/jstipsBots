import sys
import requests
import time

api_url = 'https://api.telegram.org/bot'
TOKEN = sys.argv[1]

def url(method):
    return api_url + TOKEN + '/' + method

print("Waiting for requests...")
offset = None

while 1:

    request = requests.post(url('getUpdates'), data={'offset':offset})
    json = request.json()

    if json['ok']:
        result = json['result']
        if len(result) > 0:
            for update in result:
                print (update)
                chat_id = update['message']['chat']['id']
                subject = update['message']['from']['first_name']
                requests.post(url('sendMessage'), data={'chat_id' : chat_id, 'text' : 'Hola ' + subject + '!'})
            offset = result[-1]['update_id'] + 1
    else:
        print("Connection to Telegram failed!")
        break;

    #Sleep time
    time.sleep(0.2)

print("Server stopped for some reason!!")
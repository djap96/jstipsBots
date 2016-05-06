"""Python Server that handles tips and users"""

import signal
import time
import sys

import bot


def signal_handler(signal, frame):
    """Catch Ctrl + C interruptions"""
    bot.log_message("Server stopped [Ctrl + C]")
    bot.log_message("Now, bot is dead :(")
    sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)

updates_offset = None

bot.log_message("It's alive!! Waiting for messages...")

while 1:

    messages = bot.get_user_messages(updates_offset)

    if messages == None:
        time.sleep(5) 
        continue

    result = messages['result']

    if len(result) > 0:
        for update in result:

            chat_id = update['message']['chat']['id']
            subject = update['message']['from']

            bot.log_message(
                'Hello from '
                + subject['first_name']
                + ' ' + subject['last_name'],
                update
            )

            bot.say_hello(chat_id, subject)

        updates_offset = result[-1]['update_id'] + 1

    # Sleep time
    time.sleep(0.2)

print("JSTB: Server stopped for some reason!!")

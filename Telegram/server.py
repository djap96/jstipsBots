"""Python Server that handles tips and users"""

import signal
import time
import sys

import bot
import utils


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
    else:
        result = messages['result']

    if len(result) > 0:
        for update in result:

            message = update['message']
            message_type = utils.get_message_type(message)

            if message_type == 'NO_TEXT':
                # bot.leave_on_seen(message)
                pass

            elif message_type == 'NO_COMMAND':
                bot.say_cant_talk(message)

            elif message_type == 'COMMAND':
                command = utils.get_command(message)

                if command == 'start':
                    bot.say_hello(message)

                elif command == 'random':
                    bot.give_random_tip(message)

                elif command == 'today':
                    bot.give_today_tip(message)

                else:
                    bot.say_no_command(message)

        updates_offset = result[-1]['update_id'] + 1

    # Sleep time
    time.sleep(0.2)

bot.log_message('Server stopped for some reason!!')

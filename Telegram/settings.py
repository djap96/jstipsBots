
"""Enviroment Setting for jstipsBot"""

from os import environ
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

API_TOKEN = environ.get('TOKEN')
API_URL = 'https://api.telegram.org/bot'

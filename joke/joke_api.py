import requests


JOKE_API_URL = 'https://icanhazdadjoke.com{}'

SEARCH_SUFFIX = '/search{params}'
IMAGE_SUFFIX = '/j/{id}.png'
FETCH_SUFFIX = '/j/{id}'

class JokeAPI(object):
    def __init__(self, max_threads=None):
        self.max_threads = max_threads or 10
        self.jokes_by_id = {}


    def get_by_id(self, url):
        requests.get(url)


    def get_n_jokes_unique(self, n, page=1):
        request_url = JOKE_API_URL.format(
            JOKE_API_URL
        )

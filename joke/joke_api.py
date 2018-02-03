import sys

sys.path.extend(
'../'
)

import requests
from multiprocessing.dummy import Pool as ThreadPool

from models.joke import Joke

JOKE_API_URL = 'https://icanhazdadjoke.com{}'

SEARCH_SUFFIX = '/search{params}'
IMAGE_SUFFIX = '/j/{id}.png'
FETCH_SUFFIX = '/j/{id}'

'''
    Joke resposne format:
      "id": "R7UfaahVfFd",
      "joke": "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away.",
      "status": 200
'''

class JokeAPI(object):
    def __init__(self, max_threads=None):
        self.max_threads = max_threads or 10
        self.jokes_by_id = {}

    def save_by_id(self, url):
        try:
            response = requests.get(
                url,
                headers={
                    "User-Agent": "Coding challenge (github link)",
                    "Accept": "application/json"
                }
            )
            if response.status_code == 200:
                joke = response.json()
                self.jokes_by_id[joke['id']] = joke['joke']
        except:
            # If one fails, we'll try again later.
            pass

    def get_top_n(self, n):
        jokes = []
        return jokes

    def get_bottom_n(self, n):
        jokes = []
        return jokes

    def get_n_jokes_unique(self, n):
        request_url = JOKE_API_URL.format('')
        thread_pool = ThreadPool(min(self.max_threads, n))
        thread_pool.map(self.save_by_id, [request_url] * n)
        thread_pool.close()
        thread_pool.join()

        while len(self.jokes_by_id) < n:
            self.save_by_id(request_url)

        return [{'id': j_id, 'joke': joke} for j_id, joke in self.jokes_by_id.items()]

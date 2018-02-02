
JOKE_API_URL = 'https://icanhazdadjoke.com/api'


class JokeAPI(object):
    def __init__(self, max_threads=None):
        self.max_threads = max_threads or 10


    def get_n_unique_jokes(self, n):
        max_threads = min(self.max_threads, n)

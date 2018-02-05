import sys

sys.path.extend(
'../'
)

import requests
from multiprocessing.dummy import Pool as ThreadPool
from sqlalchemy import desc, func

from collections import defaultdict

from models.db import db
from models import Joke, JokeVote

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
    def __init__(self, user_id=None, max_threads=None):
        self.max_threads = max_threads or 10
        self.jokes_by_id = {}
        self.user_id = user_id

    def save_by_id(self, url):
        try:
            response = requests.get(
                url,
                headers={
                    "User-Agent": "Coding challenge (https://github.com/wwwidmer/rithm)",
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
        top_votes = db.session.query(
            JokeVote.joke_id,
            Joke.joke,
            func.count(JokeVote.vote)
        ).filter(
            JokeVote.vote
        ).join(
            Joke, Joke.id == JokeVote.joke_id
        ).order_by(
            desc(func.count(JokeVote.vote))
        ).group_by(
            JokeVote.joke_id
        ).limit(n).all()
        voted = defaultdict(lambda: None)
        jokes = {
            'items': [
                {'id': res[0], 'joke': res[1], 'vote': voted[res[0]]} for res in top_votes
            ]
        }

        return jokes

    def get_bottom_n(self, n):
        top_votes = db.session.query(
            JokeVote.joke_id,
            Joke.joke,
            func.count(JokeVote.vote)
        ).filter(
            JokeVote.vote == False
        ).join(
            Joke, Joke.id == JokeVote.joke_id
        ).order_by(
            desc(func.count(JokeVote.vote))
        ).group_by(
            JokeVote.joke_id
        ).limit(n).all()
        voted = defaultdict(lambda: None)
        jokes = {
            'items': [
                {'id': res[0], 'joke': res[1], 'vote': voted[res[0]]} for res in top_votes
            ]
        }
        return jokes

    def get_n_jokes_unique(self, n):
        request_url = JOKE_API_URL.format('')
        thread_pool = ThreadPool(min(self.max_threads, n))
        thread_pool.map(self.save_by_id, [request_url] * n)
        thread_pool.close()
        thread_pool.join()

        while len(self.jokes_by_id) < n:
            self.save_by_id(request_url)

        items = []
        voted = defaultdict(lambda: None)
        for j_id, joke in self.jokes_by_id.items():
            items.append(
                {'id': j_id, 'joke': joke, 'vote': voted[j_id]}
            )

            try:
                joke_in_db = Joke.query.get(j_id)
                if not joke:
                    db.session.add(Joke(id=j_id, joke=joke))
                    db.session.commit()
            except Exception as e:
                print (e)


        return {
            'items': items
        }

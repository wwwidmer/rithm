import sys

sys.path.extend(
    '../'
)

from flask import Blueprint, jsonify, request
import json

joke_blueprint = Blueprint('JokeBlueprint', __name__, url_prefix='/jokes')

from .joke_api import JokeAPI

from models.db import db
from models.joke_vote import JokeVote

def dashboard_jokes():
    joke_api = JokeAPI()
    random = joke_api.get_n_jokes_unique(20)
    jokes = {
        'top': joke_api.get_top_n(5, fallback=random),
        'bottom': joke_api.get_bottom_n(5, fallback=random),
        'random': random
    }
    return jokes


@joke_blueprint.route('/')
def index():
    response = jsonify(dashboard_jokes())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@joke_blueprint.route('/random')
def get_random():
    response = jsonify({
        'random': JokeAPI().get_n_jokes_unique(20)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@joke_blueprint.route('/<joke_id>/vote', methods=['POST'])
def vote(joke_id):
    data = json.loads(request.data.decode('ascii'))
    ip = request.remote_addr
    joke_vote = JokeVote.query.filter(
        JokeVote.client_id == ip,
        JokeVote.joke_id == joke_id
    ).first()
    if not joke_vote:
        joke_vote = JokeVote(client_id=ip, joke_id=joke_id)
        db.session.add(joke_vote)
    if 'vote' not in data:
        joke_vote.vote = None
    else:
        joke_vote.vote = data['vote']
    db.session.commit()
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

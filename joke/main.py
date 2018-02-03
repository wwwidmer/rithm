import sys

sys.path.extend(
    '../'
)

from flask import Blueprint, render_template, jsonify, redirect, url_for

joke_blueprint = Blueprint('JokeBlueprint', __name__, url_prefix='/jokes')

from .joke_api import JokeAPI

from models.joke_vote import JokeVote

def dashboard_jokes():
    joke_api = JokeAPI()

    jokes = {
        'top': joke_api.get_top_n(5),
        'bottom': joke_api.get_bottom_n(5),
        'random': joke_api.get_n_jokes_unique(1)
    }
    return jokes


@joke_blueprint.route('/')
def index():
    response = jsonify(dashboard_jokes())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@joke_blueprint.route('/random')
def get_random():
    resposne = jsonify(JokeAPI().get_n_jokes_unique(20))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@joke_blueprint.route('/vote')
def vote():
    pass

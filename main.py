from flask import Flask, request, render_template

application = Flask('CheeZJokes')

from joke.main import joke_blueprint

application.register_blueprint(joke_blueprint)
application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/rithm.db'
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
application.config['CORS_HEADERS'] = 'Content-Type'

from models.db import db
from models import JokeVote, Joke

db.app = application
db.init_app(application)

db.create_all()
db.session.commit()

@application.route('/', methods=['GET'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    application.run(host='0.0.0.0')

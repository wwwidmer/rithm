from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy

application = Flask('CheeZJokes')

from joke.main import joke_blueprint, dashboard_jokes

application.register_blueprint(joke_blueprint)
application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
application.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(application)
db.create_all()

@application.route('/', methods=['GET'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    application.run(host='0.0.0.0')

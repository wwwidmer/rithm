from flask import Flask, request, render_template

application = Flask('joke_vote')

from joke.main import joke_blueprint

application.register_blueprint(joke_blueprint)

@application.route('/', methods=['GET'])
def index():
    return render_template('index.html')


if __name__ == '__main__':
    application.run(host='0.0.0.0')

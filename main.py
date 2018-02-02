from flask import Flask, request, send_from_directory

application = Flask('manager')

@application.route('/', methods=['GET'])
def index():
    pass


if __name__ == '__main__':
    application.run(host='0.0.0.0')

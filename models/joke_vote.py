from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class JokeVote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    joke_id = db.Column(db.String)
    client_id = db.Column(db.String)
    up_vote = db.Column(db.Boolean)

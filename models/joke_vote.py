from .db import db


class JokeVote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.String)
    joke_id = db.Column(db.String, db.ForeignKey('joke.id'))
    vote = db.Column(db.Boolean)

    def __repr__(self):
        return '{} {}'.format(self.joke_id, self.vote)

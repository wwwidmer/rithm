from .db import db


class Joke(db.Model):
    id = db.Column(db.String, primary_key=True)
    joke = db.Column(db.String, unique=True, nullable=False)

    def __repr__(self):
        return self.joke

from app import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String())
    date = db.Column(db.String())
    text = db.Column(db.String())

    def __init__(self, author, date, text):
        self.author = author
        self.date = date
        self.text = text

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'author': self.author,
            'date':self.date,
            'text':self.text
        }

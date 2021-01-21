import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import Post

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/posts", methods=['POST'])
def add_post():
    date = request.args.get('date')
    author = request.args.get('author')
    text = request.args.get('text')
    try:
        post=Post(
            date=date,
            author=author,
            text=text
        )
        db.session.add(post)
        db.session.commit()
        return "Post added. post id={}".format(post.id)
    except Exception as e:
	    return(str(e))

@app.route("/posts", methods=['GET'])
def get_all():
    try:
        posts=Post.query.all()
        return jsonify([e.serialize() for e in posts])
    except Exception as e:
	    return(str(e))

@app.route("/posts/<id_>", methods=['GET'])
def get_by_id(id_):
    try:
        post=Post.query.filter_by(id=id_).first()
        return jsonify(post.serialize())
    except Exception as e:
	    return(str(e))

@app.route("/posts", methods=['DELETE'])
def delete_All():
    try:
        num_deleted = Post.query.delete()
        db.session.commit()
        return jsonify("Success, deleted " + str(num_deleted))
    except Exception as e:
	    return(str(e))

if __name__ == '__main__':
    app.run()

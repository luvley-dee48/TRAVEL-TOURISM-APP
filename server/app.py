from flask import Flask, make_response, jsonify
from flask_migrate  import Migrate

from models import db, User

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///app.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

migrate = Migrate(app, db)

db.init_app(app)

@app.route("/")
def index():
    return "<h1> The Tourism Tracker App </h1>"

@app.route("/all_users")
def get_all_users():
    users = User.query.all()
    users_list= []

    for user in users:
        user_dict = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'profile_pic': user.profile_pic
        }
        users_list.append(user_dict)
        
    response= make_response(users_list, 200)
    return response

@app.route("/users")
def get_first_user():
    user = User.query.first()
    user_dict = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'profile_pic': user.profile_pic
    }

    response = make_response(user_dict, 200)

    return response

@app.route("/users/<int:id>")
def user_by_id(id):
    user = User.query.filter_by(id=id).first()

    if user:
        body = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'profile_pic': user.profile_pic
        }
        status = 200

    else:
        body = {
            "message": f"User id:{id} not found."
        }
        status = 404

    return make_response(body, status)

if __name__ == "__main__":
    app.run(port=5555, debug=True)

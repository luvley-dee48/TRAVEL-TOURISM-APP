from flask import Flask, make_response, jsonify, request
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
    users_list= [
        {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'profile_pic': user.profile_pic
        }for user in users
    ]
    return make_response(jsonify(users_list), 200)


@app.route("/users", methods=["GET","POST"])
def users():
    if request.method == "GET":
        users = [
            {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'profile_pic': user.profile_pic
            }for user in User.query.all()
        ]
        return make_response(jsonify(users), 200)
            

    elif request.method == 'POST':
        new_user = User(
            username=request.form.get("username"),
            email=request.form.get("email"),
            profile_pic=request.form.get("profile_pic")
        )

        db.session.add(new_user)
        db.session.commit()

        user_dict = {
            'id': new_user.id,
            'username': new_user.username,
            'email': new_user.email,
            'profile_pic': new_user.profile_pic
        }

        return make_response(jsonify(user_dict), 201)
    

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

    return make_response(jsonify(body), status)

@app.route("/first_user")
def get_first_user():
    user = User.query.first()
    user_dict = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'profile_pic': user.profile_pic
    }

    response = make_response(jsonify(user_dict), 200)

    return response


@app.route("/users/<int:id>", methods=["GET", "PATCH", "DELETE"])
def get_user_by_id(id):
    user = User.query.filter_by(id=id).first()

    if user is None:
        body = {
            "message": f"User id:{id} not found."
        }
        status = 404
    else:
        if request.method == "GET":
            user_dict = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'profile_pic': user.profile_pic
            }
            status = 200

        elif request.method == "PATCH":
            data = request.get_json()
            if data:
                if 'username' in data:
                    user.username = data['username']
                if 'email' in data:
                    user.email = data['email']
                if 'profile_pic' in data:
                    user.profile_pic = data['profile_pic']
                db.session.commit()
                user_dict = {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'profile_pic': user.profile_pic
                }
                status = 200
            else:
                user_dict = {
                    "message": "Invalid data provided."
                }
                status = 400

        elif request.method == "DELETE":
            db.session.delete(user)
            db.session.commit()
            user_dict = {}
            status = 204

    return make_response(jsonify(user_dict), status)
        
if __name__ == "__main__":
    app.run(port=5555, debug=True)

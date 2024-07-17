from flask import Flask, make_response, jsonify, request
from flask_migrate  import Migrate
from datetime import datetime, timezone
from models import db, User, PlannedTrip, Destination, Review, TripsUsers
from flask_cors import CORS

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///app.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

@app.route("/")
def index():
    return "<h1> The Tourism Tracker App </h1>"

@app.route("/all_users")
def get_all_users():
    users = User.query.all()
    users_list = [
        {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'profile_pic': user.profile_pic
        } for user in users
    ]
    return make_response(jsonify(users_list), 200)

@app.route("/users", methods=["GET", "POST"])
def users():
    if request.method == "GET":
        users = User.query.all()
        users_list = [
            {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'profile_pic': user.profile_pic
            } for user in users
        ]
        return jsonify(users_list), 200
            
    elif request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        username = data.get("username")
        email = data.get("email")
        profile_pic = data.get("profile_pic")
        
        if not username or not email:
            return jsonify({"error": "Missing username or email"}), 400
        
        new_user = User(
            username=username,
            email=email,
            profile_pic=profile_pic
        )
        try:
            db.session.add(new_user)
            db.session.commit()
            user_dict = {
                'id': new_user.id,
                'username': new_user.username,
                'email': new_user.email,
                'profile_pic': new_user.profile_pic
            }
            return jsonify(user_dict), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400

@app.route("/users/<int:id>", methods=["GET", "PUT", "PATCH", "DELETE"])
def get_user_by_id(id):
    user = User.query.filter_by(id=id).first()
    if user is None:
        return make_response(jsonify({"message": f"User id:{id} not found."}), 404)
    
    if request.method == "GET":
        user_dict = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'profile_pic': user.profile_pic
        }
        return make_response(jsonify(user_dict), 200)

    elif request.method == "PUT":
        data = request.get_json()
        if not data:
            return jsonify({"message": "No data provided."}), 400
        
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.profile_pic = data.get('profile_pic', user.profile_pic)
        db.session.commit()

        user_dict = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'profile_pic': user.profile_pic
        }
        return make_response(jsonify(user_dict), 200)

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
            return make_response(jsonify(user_dict), 200)
        else:
            return jsonify({"message": "Invalid data provided."}), 400

    elif request.method == "DELETE":
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": f"User id:{id} has been deleted."}), 204


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

@app.route("/planned_trips", methods=["GET", "POST"])
def planned_trips():
    if request.method == "GET":
        trips = [
            {
                'id': trip.id,
                'user_id': trip.user_id,
                'name': trip.name,
                'description': trip.description,
                'start_date': trip.start_date,
                'end_date': trip.end_date,
                'destination_id': trip.destination_id
            } for trip in PlannedTrip.query.all()
        ]
        return make_response(jsonify(trips), 200)
    elif request.method == 'POST':
        data = request.get_json()

        #  will help me Convert date strings to datetime.date objects
        start_date = datetime.strptime(data.get("start_date"), "%Y-%m-%d").date()
        end_date = datetime.strptime(data.get("end_date"), "%Y-%m-%d").date()

        new_trip = PlannedTrip(
            user_id=data.get("user_id"),
            name=data.get("name"),
            description=data.get("description"),
            start_date=start_date,
            end_date=end_date,
            destination_id=data.get("destination_id")
        )
        db.session.add(new_trip)
        db.session.commit()
        trip_dict = {
            'id': new_trip.id,
            'user_id': new_trip.user_id,
            'name': new_trip.name,
            'description': new_trip.description,
            'start_date': new_trip.start_date,
            'end_date': new_trip.end_date,
            'destination_id': new_trip.destination_id
        }
        return make_response(jsonify(trip_dict), 201)

@app.route("/planned_trips/<int:id>", methods=["GET", "PATCH", "DELETE"])
def get_planned_trip_by_id(id):
    trip = PlannedTrip.query.filter_by(id=id).first()
    if trip is None:
        body = {"message": f"PlannedTrip id:{id} not found."}
        status = 404
    else:
        if request.method == "GET":
            trip_dict = {
                'id': trip.id,
                'user_id': trip.user_id,
                'name': trip.name,
                'description': trip.description,
                'start_date': trip.start_date,
                'end_date': trip.end_date,
                'destination_id': trip.destination_id
            }
            status = 200
        elif request.method == "PATCH":
            data = request.get_json()
            if data:
                if 'name' in data:
                    trip.name = data['name']
                if 'description' in data:
                    trip.description = data['description']
                if 'start_date' in data:
                    trip.start_date = datetime.strptime(data['start_date'], "%Y-%m-%d").date()
                if 'end_date' in data:
                     trip.end_date = datetime.strptime(data['end_date'], "%Y-%m-%d").date()
                if 'destination_id' in data:
                     trip.destination_id = data['destination_id']
                db.session.commit()
                trip_dict = {
                    'id': trip.id,
                    'user_id': trip.user_id,
                    'name': trip.name,
                    'description': trip.description,
                    'start_date': trip.start_date,
                    'end_date': trip.end_date,
                    'destination_id': trip.destination_id
                }
                status = 200
            else:
                trip_dict = {"message": "Invalid data provided."}
                status = 400
                
        elif request.method == "DELETE":
            db.session.delete(trip)
            db.session.commit()
            trip_dict = {}
            status = 204
    return make_response(jsonify(trip_dict), status)

@app.route("/destinations", methods=["GET", "POST"])
def destinations():
    if request.method == "GET":
        destinations = [
            {
                "id": destination.id,
                "name": destination.name,
                "description": destination.description,
                "location": destination.location,
                "image_url": destination.image_url
            } for destination in Destination.query.all()
        ]
        return make_response(jsonify(destinations), 200)
    
    elif request.method == "POST":
        data = request.get_json()
        new_destination = Destination(
            name=data.get("name"),
            description=data.get("description"),
            location=data.get("location"),
            image_url=data.get("image_url")
        )
        db.session.add(new_destination)
        db.session.commit()
        destination_dict = {
            'id': new_destination.id,
            'name': new_destination.name,
            'description': new_destination.description,
            'location': new_destination.location,
            'image_url': new_destination.image_url
        }
        return make_response(jsonify(destination_dict), 201)
 
@app.route("/destinations/<int:id>", methods=["GET", "PATCH", "DELETE"])
def get_destination_by_id(id):
    destination = Destination.query.filter_by(id=id).first()
    if destination is None:
        body = {"message": f"Destination id:{id} not found."}
        status = 404
    else:
        if request.method == "GET":
            destination_dict = {
                'id': destination.id,
                'name': destination.name,
                'description': destination.description,
                'location': destination.location,
                'image_url': destination.image_url
            }
            status = 200
        elif request.method == "PATCH":
            data = request.get_json()
            if data:
                if 'name' in data:
                    destination.name = data['name']
                if 'description' in data:
                    destination.description = data['description']
                if 'location' in data:
                    destination.location = data['location']
                if 'image_url' in data:
                    destination.image_url = data['image_url']
                db.session.commit()
                destination_dict = {
                    'id': destination.id,
                    'name': destination.name,
                    'description': destination.description,
                    'location': destination.location,
                    'image_url': destination.image_url
                }
                status = 200
            else:
                destination_dict = {"message": "Invalid data provided."}
                status = 400
        elif request.method == "DELETE":
            db.session.delete(destination)
            db.session.commit()
            destination_dict = {}
            status = 204
    return make_response(jsonify(destination_dict), status)


@app.route("/reviews", methods=["GET", "POST"])
def reviews():
    if request.method == "GET":
        reviews = Review.query.all()
        reviews_list = [
            {
                'id': review.id,
                'rating': review.rating,
                'comments': review.comments,
                'date_posted': review.date_posted,
                'user_id': review.user_id,
                'destination_id': review.destination_id
            } for review in reviews
        ]
        return jsonify(reviews_list), 200

    elif request.method == "POST":
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        rating = data.get("rating")
        comments = data.get("comments")
        user_id = data.get("user_id")
        destination_id = data.get("destination_id")

        if not rating or not user_id or not destination_id:
            return jsonify({"error": "Missing rating, user_id, or destination_id"}), 400

        new_review = Review(
            rating=rating,
            comments=comments,
            user_id=user_id,
            destination_id=destination_id,
            date_posted=datetime.now(timezone.utc)
        )

        db.session.add(new_review)
        db.session.commit()
        review_dict = {
            'id': new_review.id,
            'rating': new_review.rating,
            'comments': new_review.comments,
            'date_posted': new_review.date_posted,
            'user_id': new_review.user_id,
            'destination_id': new_review.destination_id
        }
        return jsonify(review_dict), 201

@app.route("/reviews/<int:id>", methods=["GET", "PATCH", "DELETE"])
def review_by_id(id):
    review = Review.query.filter_by(id=id).first()
    if review is None:
        return jsonify({"message": f"Review id:{id} not found."}), 404

    if request.method == "GET":
        review_dict = {
            'id': review.id,
            'rating': review.rating,
            'comments': review.comments,
            'date_posted': review.date_posted,
            'user_id': review.user_id,
            'destination_id': review.destination_id
        }
        return jsonify(review_dict), 200

    elif request.method == "PATCH":
        data = request.get_json()
        if data:
            if 'rating' in data:
                review.rating = data['rating']
            if 'comments' in data:
                review.comments = data['comments']
            if 'user_id' in data:
                review.user_id = data['user_id']
            if 'destination_id' in data:
                review.destination_id = data['destination_id']

            db.session.commit()
            review_dict = {
                'id': review.id,
                'rating': review.rating,
                'comments': review.comments,
                'date_posted': review.date_posted,
                'user_id': review.user_id,
                'destination_id': review.destination_id
            }
            return jsonify(review_dict), 200
        else:
            return jsonify({"message": "Invalid data provided."}), 400

    elif request.method == "DELETE":
        db.session.delete(review)
        db.session.commit()
        return jsonify({}), 204

@app.route("/trips_users", methods=["POST"])
def create_trip_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    user_id = data.get("user_id")
    trip_id = data.get("trip_id")

    if not user_id or not trip_id:
        return jsonify({"error": "Missing user_id or trip_id"}), 400

   
    user = User.query.get(user_id)
    trip = PlannedTrip.query.get(trip_id)

    if not user:
        return jsonify({"error": f"User with id {user_id} not found"}), 404

    if not trip:
        return jsonify({"error": f"PlannedTrip with id {trip_id} not found"}), 404

    # Create the new relationship
    new_trip_user = TripsUsers(
        user_id=user_id,
        trip_id=trip_id
    )

    db.session.add(new_trip_user)
    db.session.commit()

    return jsonify({"message": "Trip user relationship created successfully"}), 201

@app.route("/trips_users/<int:user_id>/<int:trip_id>", methods=["DELETE"])
def delete_trip_user(user_id, trip_id):
    trip_user = TripsUsers.query.filter_by(user_id=user_id, trip_id=trip_id).first()
    if not trip_user:
        return jsonify({"error": "Trip user relationship not found"}), 404

    db.session.delete(trip_user)
    db.session.commit()

    return jsonify({"message": "Trip user relationship deleted successfully"}), 204

@app.route("/trips_users", methods=["GET"])
def get_all_trip_users():
    trip_users = TripsUsers.query.all()
    trip_users_list = [
        {
            'user_id': trip_user.user_id,
            'trip_id': trip_user.trip_id
        } for trip_user in trip_users
    ]
    return jsonify(trip_users_list), 200

@app.route("/trips_users/<int:user_id>/<int:trip_id>", methods=["GET"])
def get_trip_user(user_id, trip_id):
    trip_user = TripsUsers.query.filter_by(user_id=user_id, trip_id=trip_id).first()
    if not trip_user:
        return jsonify({"error": "Trip user relationship not found"}), 404

    trip_user_dict = {
        'user_id': trip_user.user_id,
        'trip_id': trip_user.trip_id
    }
    return jsonify(trip_user_dict), 200


if __name__ == "__main__":
    app.run(port=5555, debug=True)

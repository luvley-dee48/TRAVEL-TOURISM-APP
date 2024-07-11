from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime, timezone
from sqlalchemy_serializer import SerializerMixin


db = SQLAlchemy(metadata=MetaData())

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(124), nullable=False, unique=True)
    password = db.Column(db.String(120))
    profile_pic = db.Column(db.String(120))

    planned_trips= db.relationship("PlannedTrip", backref="user", lazy=True)
    reviews= db.relationship("Review",backref="user", lazy=True)
    user_trips = db.relationship('TripsUsers', backref='user', lazy=True)

    def __repr__(self):
         return f'<User {self.username}>'
    
class PlannedTrip(db.Model, SerializerMixin):
    __tablename__ = 'planned_trips'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(80))
    description = db.Column(db.Text)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    destination_id = db.Column(db.Integer, db.ForeignKey("destinations.id")) 

    destination = db.relationship("Destination", backref="planned_trips", lazy=True)
    trip_users = db.relationship('TripsUsers', backref='planned_trip', lazy=True)


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comments = db.Column(db.Text, nullable=True)
    date_posted = db.Column(db.Date, default=datetime.now(timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))

class Destination(db.Model):
    __tablename__ = 'destinations'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String(255))
    image_url = db.Column(db.String(500))

    reviews = db.relationship("Review", backref="destination", lazy=True)
   	
class TripsUsers(db.Model, SerializerMixin):
    __tablename__ = 'trips_users'

    trip_id = db.Column(db.Integer, db.ForeignKey('planned_trips.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    # trip = db.relationship('PlannedTrip', backref=db.backref('trip_users', cascade='all, delete-orphan'))

    
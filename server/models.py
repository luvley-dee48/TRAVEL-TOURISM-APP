from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime, timezone

db = SQLAlchemy(metadata=MetaData())

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(124))
    password = db.Column(db.String(120))
    profile_pic = db.Column(db.String(120))

    def __repr__(self):
         return f'<User {self.username}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic
        }


class PlannedTrip(db.Model):
    __tablename__ = 'planned_trips'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(80))
    description = db.Column(db.Text)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    destination = db.Column(db.Integer, db.ForeignKey("users.id"))

class Destination(db.Model):
    __tablename__='destinations'
    id= db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(80))
    description= db.Column(db.Text)
    location= db.Column(db.String(80))
    image_url=db.Column(db.String(120))


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comments = db.Column(db.Text, nullable=True)
    date_posted = db.Column(db.Date, default=datetime.now(timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))


	
class TripsUsers(db.Model):
    __tablename__ = 'trips_users'

    trip_id = db.Column(db.Integer, db.ForeignKey('planned_trips.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    trip = db.relationship('PlannedTrip', backref=db.backref('trip_users', cascade='all, delete-orphan'))
    user = db.relationship('User', backref=db.backref('user_trips', cascade='all, delete-orphan'))

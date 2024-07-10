from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

db = SQLAlchemy(metadata=MetaData())

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(124))
    password = db.Column(db.String(120))
    profile_pic = db.Column(db.String(120))


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

class Reviews(db.Model):
    __tablename__='reviews'
    id=db.Column(db.Integer, primary_key=True)
    
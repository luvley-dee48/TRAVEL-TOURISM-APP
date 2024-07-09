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


from app import app
from models import db, User

with app.app_context():
    users = []

    users.append(User(username="Joanna Neema", email="joannaneeema72@gmail.com",password="hepsibah21"))
    users.append(User(username="Misalibok", email="misalibokula@gmail.com", password="jesusgirl4ever"))

    db.session.add_all(users)

    db.session.commit()

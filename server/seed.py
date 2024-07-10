from app import app
from models import db, User

with app.app_context():

    User.query.delete()


    users = []

    users.append(User(username="Joanna Neema", email="joannaneeema72@gmail.com", password="hepsibah21", profile_pic="https://i.pinimg.com/564x/34/46/41/3446414231da15c7688264495433ecd4.jpg"))
    users.append(User(username="Misalibok", email="misalibokula@gmail.com", password="jesusgirl4ever",profile_pic="https://i.pinimg.com/236x/18/fb/74/18fb747ab9b0259c8c658e96635be890.jpg" ))
    users.append(User(username="Harry Johson", email="harryjohnson@gmail.com", password="land4cruiser",profile_pic="https://www.pinterest.com/pin/866872628264236046/" ))
    users.append(User(username="Christian", email="christeen@gmail.com", password="christeenloves",profile_pic="https://i.pinimg.com/236x/c3/80/80/c380803d9b4d580439b0050c303db3f2.jpg" ))
    users.append(User(username="Gloria Clinton", email="gloriatibu@gmail.com", password="tibuhealth",profile_pic="https://i.pinimg.com/236x/dd/43/c3/dd43c32b27f13043a611a65c73e11302.jpg" ))
    users.append(User(username="Ian Jules", email="iandrummer.com", password="ruachsouth",profile_pic="https://i.pinimg.com/564x/77/25/f4/7725f4cb560bf3ba9d75846b03fc88a6.jpg" ))
    users.append(User(username="Shaky Naserian", email="naserianshaky@gmail.com", password="1234f",profile_pic="https://i.pinimg.com/474x/f2/ac/05/f2ac0517f7cf780a1b1b3d69e8ad34f4.jpg" ))
    users.append(User(username="Daikel Cavin", email="daikelbro@gmail.com", password="room88",profile_pic="https://i.pinimg.com/474x/70/70/7e/70707e7e89ff379c4ffc675311b2a239.jpg" ))
    users.append(User(username="Andy Elie", email="aelie45@gmail.com", password="lyon",profile_pic="https://i.pinimg.com/236x/bb/54/be/bb54be9dc21aa1d9b28fbd805e450272.jpg" ))
    users.append(User(username="Andrianna Malone ", email="maloneandria@gmail.com", password="maaylone",profile_pic="https://i.pinimg.com/474x/fe/8f/8a/fe8f8a9b1aa2dad21d5f4ec99b76c24a.jpg" ))
    users.append(User(username="Melissa Sabia", email="melisasabia@gmail.com", password="fortunegrace",profile_pic="https://i.pinimg.com/236x/0e/f3/29/0ef329911e4ec275dcf5b19244aa2200.jpg" ))
    users.append(User(username="Tiona Moorehead", email="tmorehead@gmail.com", password="heat",profile_pic="https://i.pinimg.com/236x/f3/00/dd/f300ddeeef07506790ad9d8ab21a6be5.jpg" ))
    users.append(User(username="Natalie Morgan", email="nmorgan1@gmail.com", password="lyanne",profile_pic="https://i.pinimg.com/236x/19/fa/35/19fa35e819bef5f8641b69fbae0ebab8.jpg" ))
    users.append(User(username="Tiona Moorehead", email="tmorehead@gmail.com", password="heat",profile_pic="https://i.pinimg.com/236x/f3/00/dd/f300ddeeef07506790ad9d8ab21a6be5.jpg" ))
    users.append(User(username="Jeremiah Parker", email="jeremiahparker656@gmail.com", password="jemmy23",profile_pic="https://i.pinimg.com/236x/f6/96/76/f6967658a300429c6cce91d1aaf32540.jpg" ))
  

    db.session.add_all(users)
    db.session.commit()



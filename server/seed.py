from app import app
from models import db, User, PlannedTrip, Destination, Review, TripsUsers
from datetime import datetime, timezone

with app.app_context():
    db.create_all()

    # Clear existing data (if any)
    User.query.delete()
    PlannedTrip.query.delete()
    Destination.query.delete()
    Review.query.delete()
    TripsUsers.query.delete()

    # Create Destinations
    destinations = [
        Destination(name="Hanoi, Vietnam", description="Hanoi—the capital of Vietnam—is known for its rich history, busy street life and centuries of French, Asian and Chinese influences all blended into one bustling city.", location="Vietnam", image_url="https://imageio.forbes.com/specials-images/dam/imageserve/1154171905/960x0.jpg?format=jpg&width=1440"),
        Destination(name="Singapore", description="Singapore is a small island city-state off southern Malaysia which punches way above its weight on a global level. It’s a modern city with colorful buildings, futuristic bridges and a cloud forest.", location="Singapore", image_url="https://imageio.forbes.com/specials-images/dam/imageserve/594409341/960x0.jpg?format=jpg&width=1440"),
        Destination(name="Kerry Ireland", description="All the way west in Ireland is one of the country’s most scenic counties.", location="Dublin", image_url="https://imageio.forbes.com/specials-images/dam/imageserve/1166259909/960x0.jpg?format=jpg&width=1440"),
        Destination(name="Dubai", description="Dubai is one of the most glamorous destinations you’ll ever visit, and is particularly popular with Big 7 Travel readers.", location="Dubai", image_url="https://imageio.forbes.com/specials-images/dam/imageserve/1141969923/960x0.jpg?format=jpg&width=1440"),
        Destination(name="Nairobi", description="Nairobi is the capital and largest city of Kenya.", location="Kenya", image_url="https://images.pexels.com/photos/26898331/pexels-photo-26898331/free-photo-of-aerial-view-of-nairobi-expressway-and-modern-skyline.jpeg"),
        Destination(name="Maasai Mara", description="Maasai Mara is one of the wildlife conservation and wilderness areas in Africa, with its populations of lion, leopard, cheetah and African bush elephant.", location="Kenya", image_url="https://images.pexels.com/photos/6401317/pexels-photo-6401317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"),
        Destination(name="Burj Khalifa", description="An extremely tall skyscraper in Dubai, United Arab Emirates named after Khalifa bin Zayed Al Nahyan, and is the tallest building ever built, at 828 metres (2,717 ft). ", location="Dubai", image_url="https://images.pexels.com/photos/1707310/pexels-photo-1707310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"),
        Destination(name="Victoria Falls", description="It is a waterfall on the Zambezi River, located on the border between Zambia and Zimbabwe. It is one of the world's largest waterfalls", location="Zimbabwe", image_url="https://cdn.kimkim.com/files/a/content_articles/featured_photos/349c7706fc802f6e8983366c313668461562c766/big-81d49a95306b86dc9ac17b9e146a6b0f.jpg"),
        Destination(name="Mount Everest", description="Mount Everest is a peak in the Himalaya mountain range. It is located between Nepal and Tibet, an autonomous region of China.", location="Nepal", image_url="https://i.pinimg.com/236x/2e/bc/d3/2ebcd34a96741aa513005cfc2a569cd9.jpg"),
        Destination(name="Niagara Falls", description="Niagara Falls is composed of three waterfalls. From largest to smallest, it contains: the Horseshoe Falls (also known as the Canadian Falls), American Falls and Bridal Veil Falls.", location="USA", image_url="https://images.pexels.com/photos/753772/pexels-photo-753772.jpeg?auto=compress&cs=tinysrgb&w=600"),
        Destination(name="Great Wall of China", description="The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states. It is the longest structure humans have ever built. ", location="China", image_url="https://i.pinimg.com/474x/c2/fa/28/c2fa28c0955a484290033a98574d01e9.jpg"),
        Destination(name="Pyramids of Egypt,", description="Ancient pyramids. The pyramids of ancient Egypt were royal tombs. ", location="Egypt", image_url="https://images.pexels.com/photos/10952316/pexels-photo-10952316.jpeg?auto=compress&cs=tinysrgb&w=600"),
        Destination(name="Haller Park", description="Haller Park is a nature park in Bamburi, Mombasa, on the Kenyan coast. ", location="Kenya", image_url="https://imageio.forbes.com/specials-images/dam/imageserve/1161372108/960x0.jpg?format=jpg&width=1440"),
        Destination(name="Maldives", description="It is not cheap or easy to reach, but this isolated Indian Ocean vacation spot located southwest of India is the personification of a dreamy tropical retreat. ", location="Nestled southwest of Sri Lanka and India.", image_url="https://travel.usnews.com/dims4/USNEWS/f78aba2/2147483647/resize/976x652%5E%3E/crop/976x652/quality/85/?url=https%3A%2F%2Ftravel.usnews.com%2Fimages%2FMaldives_beach1_Getty_levente_bodo.jpg"),
        Destination(name="Providencia, Colombia", description="he Colombian island of Providencia is the perfect combination of South America and the Caribbean. ", location="Colombia", image_url="https://imageio.forbes.com/specials-images/dam/imageserve/1167612194/960x0.jpg?format=jpg&width=1440")

    ]
    db.session.add_all(destinations)
    db.session.commit()

    # Create Users
    users = [
        User(username="Joanna Neema", email="joannaneeema72@gmail.com", password="hepsibah21", profile_pic="https://i.pinimg.com/564x/34/46/41/3446414231da15c7688264495433ecd4.jpg"),
        User(username="Misalibok", email="misalibokula@gmail.com", password="jesusgirl4ever", profile_pic="https://i.pinimg.com/236x/18/fb/74/18fb747ab9b0259c8c658e96635be890.jpg"),
        User(username="Harry Johnson", email="harryjohnson@gmail.com", password="land4cruiser", profile_pic="https://i.pinimg.com/236x/6c/a8/65/6ca865c1c77339467bb931da521a2baa.jpg"),
        User(username="Christian", email="christeen@gmail.com", password="christeenloves", profile_pic="https://i.pinimg.com/236x/c3/80/80/c380803d9b4d580439b0050c303db3f2.jpg"),
        User(username="Gloria Clinton", email="gloriatibu@gmail.com", password="tibuhealth", profile_pic="https://i.pinimg.com/236x/dd/43/c3/dd43c32b27f13043a611a65c73e11302.jpg"),
        User(username="Ian Jules", email="iandrummer.com", password="ruachsouth", profile_pic="https://i.pinimg.com/564x/77/25/f4/7725f4cb560bf3ba9d75846b03fc88a6.jpg"),
        User(username="Shaky Naserian", email="naserianshaky@gmail.com", password="1234f", profile_pic="https://i.pinimg.com/474x/f2/ac/05/f2ac0517f7cf780a1b1b3d69e8ad34f4.jpg"),
        User(username="Daikel Cavin", email="daikelbro@gmail.com", password="room88", profile_pic="https://i.pinimg.com/474x/70/70/7e/70707e7e89ff379c4ffc675311b2a239.jpg"),
        User(username="Andy Elie", email="aelie45@gmail.com", password="lyon", profile_pic="https://i.pinimg.com/236x/bb/54/be/bb54be9dc21aa1d9b28fbd805e450272.jpg"),
        User(username="Andrianna Malone", email="maloneandria@gmail.com", password="maaylone", profile_pic="https://i.pinimg.com/474x/fe/8f/8a/fe8f8a9b1aa2dad21d5f4ec99b76c24a.jpg"),
        User(username="Melissa Sabia", email="melisasabia@gmail.com", password="fortunegrace", profile_pic="https://i.pinimg.com/236x/0e/f3/29/0ef329911e4ec275dcf5b19244aa2200.jpg"),
        User(username="Tiona Moorehead", email="tmorehead@gmail.com", password="heat", profile_pic="https://i.pinimg.com/236x/f3/00/dd/f300ddeeef07506790ad9d8ab21a6be5.jpg"),
        User(username="Natalie Morgan", email="nmorgan1@gmail.com", password="lyanne", profile_pic="https://i.pinimg.com/236x/19/fa/35/19fa35e819bef5f8641b69fbae0ebab8.jpg"),
        User(username="Jeremiah Parker", email="jeremiahparker656@gmail.com", password="jemmy23", profile_pic="https://i.pinimg.com/236x/f6/96/76/f6967658a300429c6cce91d1aaf32540.jpg")
    ]

    
    db.session.add_all(users)
    db.session.commit()

    # Create Planned Trips
    trips = [
        PlannedTrip(user_id=1, name="Trip to Nairobi", description="Exploring Nairobi city", start_date=datetime(2024, 8, 1), end_date=datetime(2024, 8, 5), destination_id=4),
        PlannedTrip(user_id=2, name="Safari in Maasai Mara", description="Wildlife safari in Maasai Mara", start_date=datetime(2024, 9, 1), end_date=datetime(2024, 9, 7), destination_id=2),
        PlannedTrip(user_id=4, name="Burj Khalifa", description="Is a skyscraper in Dubai, the world's largest structure.", start_date=datetime(2024, 10, 1), end_date=datetime(2024, 10, 14), destination_id=3),
        PlannedTrip(user_id=5, name="Victoria Falls", description="It is the largest waterfall in the World.", start_date=datetime(2024, 8, 5), end_date=datetime(2024, 8, 20), destination_id=1),
        PlannedTrip(user_id=3, name="Mount Everest", description="The earth's highest mountain at sea level.", start_date=datetime(2024, 6, 11), end_date=datetime(2024, 6, 12), destination_id=5),
        PlannedTrip(user_id=7, name="Niagara Falls", description="It has the world's highest flow rate.", start_date=datetime(2024, 7, 20), end_date=datetime(2024, 7, 30), destination_id=7),
        PlannedTrip(user_id=6, name="Great Wall of China", description="The largest man-made landmark on Earth.", start_date=datetime(2024, 3, 1), end_date=datetime(2024, 3, 7), destination_id=6),
        PlannedTrip(user_id=8, name="Pyramids of Egypt", description="Royal tombs.", start_date=datetime(2024, 9, 1), end_date=datetime(2024, 9, 7), destination_id=9),
        PlannedTrip(user_id=10, name="Haller Park", description="Wildlife safari.", start_date=datetime(2024, 4, 1), end_date=datetime(2024, 4, 7), destination_id=8),
]
    
    db.session.add_all(trips)
    db.session.commit()

   
    reviews = [
        Review(rating=5, comments="Amazing experience in Nairobi!", date_posted=datetime(2024, 8, 6, tzinfo=timezone.utc), user_id=1, destination_id=1),
        Review(rating=4, comments="Maasai Mara was a great adventure.", date_posted=datetime(2024, 9, 8, tzinfo=timezone.utc), user_id=2, destination_id=2),
        Review(rating=5, comments="Burj Khalifa is breathtaking!", date_posted=datetime(2024, 10, 15, tzinfo=timezone.utc), user_id=4, destination_id=3),
        Review(rating=4, comments="Victoria Falls is magnificent.", date_posted=datetime(2024, 8, 21, tzinfo=timezone.utc), user_id=5, destination_id=4),
        Review(rating=3, comments="Mount Everest trip was challenging but rewarding.", date_posted=datetime(2024, 6, 13, tzinfo=timezone.utc), user_id=3, destination_id=5),
        Review(rating=5, comments="Niagara Falls is a must-see!", date_posted=datetime(2024, 7, 31, tzinfo=timezone.utc), user_id=7, destination_id=6),
        Review(rating=4, comments="Great Wall of China is a historical marvel.", date_posted=datetime(2024, 3, 8, tzinfo=timezone.utc), user_id=6, destination_id=7),
        Review(rating=5, comments="Pyramids of Egypt are awe-inspiring.", date_posted=datetime(2024, 9, 8, tzinfo=timezone.utc), user_id=8, destination_id=8),
        Review(rating=4, comments="Haller Park is a wonderful place to visit.", date_posted=datetime(2024, 12, 6, tzinfo=timezone.utc), user_id=10, destination_id=9)
    ]

    db.session.add_all(reviews)
    db.session.commit()
   
    trip_user_entries = [
        TripsUsers(user_id=4, trip_id=4),
        TripsUsers(user_id=5, trip_id=5),
        TripsUsers(user_id=6, trip_id=6),
        TripsUsers(user_id=7, trip_id=7),
        TripsUsers(user_id=8, trip_id=8),
        TripsUsers(user_id=9, trip_id=9),
        TripsUsers(user_id=10, trip_id=10),
        TripsUsers(user_id=1, trip_id=2),
        TripsUsers(user_id=3, trip_id=4),
        TripsUsers(user_id=5, trip_id=6),
    ]

    db.session.add_all(trip_user_entries)
    db.session.commit()
# Travel-Tourism app

TravelWise is a cutting-edge travel and tourism application designed to enhance your travel experiences. Whether you're planning a trip or seeking unique local adventures, TravelWise provides all the tools you need to create memorable journeys.

## Description

Whether you're a seasoned traveler or planning your first adventure, TravelWise offers a comprehensive suite of features to help you discover new destinations, create personalized itineraries, and experience local culture like never before.

Key Features:
-Add destinations, activities, and travel dates to build your perfect trip.
-Get recommendations for must-see attractions, hidden gems, and local experiences.
-Read reviews and ratings from fellow travelers to make informed decisions.
-Share your own experiences and insights with the TravelWise community.

### Requirements

- A computer with a bash terminal
- Access to the Internet

### Installation Process of the front end

1. Navigate to your terminal.

2. Create your travel tourism app using the following command

```bash
  npx create-react-app travel-tourism-app

```

3. Navigate to the project directory:

```bash
cd travel-tourism-app
```

4. Install necessary dependencies

```bash
npm install

```

5. Start the development server:

```bash
npm start

```

### Installation Process of the back end

1. Set Up the Virtual Environment:

```bash
    pipenv install
    pipenv shell
```

2. Install Flask and Required Packages:

```bash
    pipenv install flask
    pipenv flask-sQLalchemy
    pipenv install flask-migrate

```

3. Configure Your Application (config.py):

```bash
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///travelwise.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

```

4. Initialize Your Flask App (app.py)
5. Define Your Models (models.py)

```bash
flask db init
flask db migrate -m "Initial migration."
flask db upgrade

```

6. Seed your data and run

```bash
    python seed.py
```

7. Define Routes (routes.py)
8. run the app.py

### Installation Process

1. Clone this repository using

```bash
 git clone git@github.com:luvley-dee48/TRAVEL-TOURISM-APP.git
```

2.  Navigate to the project folder on your bash terminal.

3.  Install dependancies using

```bash
    pipenv install
    pipenv shell
```

```bash
    python seed.py
```

```bash
    pipenv install flask-cors
```

4.  Run the application using

```bash
    python app.py
    npm start
```


##
To be able to change user to admin download **SQLite3 Editor**
Go to users then under role edit to **admin**

## Technologies Used

React
Python
sqllite

## Support and Contact Details

Incase of any query, need for collaboration or issues with this code, feel free to reach me at
<deborah.muoti@student.moringaschool.com>

### Team collaboration

Thank you, Lornah Munene, James Mbugua, and Doc Obura, for your invaluable collaboration on TravelWise. Your expertise and dedication have been instrumental in overcoming challenges and bringing this project to life!

## License
MIT License

Copyright (c) 2024 luvley-dee48

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
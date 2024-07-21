import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import homeImage from "../assets/hero.png";

export default function Trips() {
  const [name, setName] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destinations, setDestinations] = useState([]);
  const userId = 1; // Assuming the user is logged in and we have their user ID

  useEffect(() => {
    // Fetch destinations when component mounts
    const fetchDestinations = async () => {
      const response = await fetch("http://127.0.0.1:5555/destinations");
      const data = await response.json();
      setDestinations(data);
    };

    fetchDestinations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDestination = destinations.find(dest => dest.name === destinationId);

    const response = await fetch("http://127.0.0.1:5555/book_trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        name,
        destination_id: selectedDestination?.id, // Use the ID of the selected destination
        start_date: startDate,
        end_date: endDate,
      }),
    });

    if (response.ok) {
      alert("Trip booked successfully!");
      // Clear the form
      setName('');
      setDestinationId('');
      setStartDate('');
      setEndDate('');
    } else {
      alert("Failed to book the trip. Please try again.");
    }
  };

  return (
    <TripSection id="trips">
      <Background>
        <img src={homeImage} alt="Background" />
      </Background>
      <Content>
        <Title>
          <h2>Book a trip with us today</h2>
        </Title>
        <Search onSubmit={handleSubmit}>
          <Container>
            <label htmlFor="name">Enter Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </Container>
          <Container>
            <label htmlFor="destination">Select Destination</label>
            <select
              id="destination"
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              required
            >
              <option value="">Select a destination</option>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.name}>
                  {destination.name}
                </option>
              ))}
            </select>
          </Container>
          <Container>
            <label htmlFor="start-date">Start Date</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Container>
          <Container>
            <label htmlFor="end-date">End Date</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </Container>
          <Button type="submit">Book Trip</Button>
        </Search>
      </Content>
    </TripSection>
  );
}

const TripSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7);
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Title = styled.div`
  color: #fff;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const Search = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.5rem;
    color: #333;
  }

  input, select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

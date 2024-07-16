import React, { useEffect, useState } from 'react';
import styled from "styled-components";

export default function Destination() {
  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({
    name: '',
    description: '',
    image_url: ''
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5555/destinations")
      .then(res => res.json())
      .then(data => setDestinations(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setNewDestination({
      ...newDestination,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5555/destinations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDestination)
    })
    .then(res => res.json())
    .then(data => {
      setDestinations([...destinations, data]);
      setNewDestination({ name: '', description: '', image_url: '' });
    })
    .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5555/destinations/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setDestinations(destinations.filter(destination => destination.id !== id));
    })
    .catch(err => console.error(err));
  };

  const handleEdit = (id, updatedDestination) => {
    fetch(`http://127.0.0.1:5555/destinations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedDestination)
    })
    .then(res => res.json())
    .then(data => {
      setDestinations(destinations.map(destination => 
        destination.id === id ? data : destination
      ));
    })
    .catch(err => console.error(err));
  };

  return (
    <Section>
      <div className="title">
        <h1>Destinations</h1>
      </div>
      <DestinationsGrid>
        {destinations.map(destination => (
          <DestinationCard key={destination.id}>
            <img src={destination.image_url} alt={destination.name} />
            <h2>{destination.name}</h2>
            <p>{destination.description}</p>
            <Button onClick={() => handleDelete(destination.id)}>Delete</Button>
           
            <Button onClick={() => handleEdit(destination.id, { name: "Updated Name", description: "Updated Description", image_url: "Updated URL" })}>Edit</Button>
          </DestinationCard>
        ))}
      </DestinationsGrid>
      <AddDestinationForm onSubmit={handleSubmit}>
        <h2>Add a New Destination</h2>
        <InputContainer>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={newDestination.name} onChange={handleChange} />
        </InputContainer>
        <InputContainer>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={newDestination.description} onChange={handleChange} />
        </InputContainer>
        <InputContainer>
          <label htmlFor="imageUrl">Image URL</label>
          <input type="text" id="imageUrl" name="image_url" value={newDestination.image_url} onChange={handleChange} />
        </InputContainer>
        <Button type="submit">Add Destination</Button>
      </AddDestinationForm>
    </Section>
  );
}

const Section = styled.section`
  padding: 2rem 0;
  .title {
    text-align: center;
  }
`;

const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  padding: 0 3rem;

  @media screen and (min-width: 280px) and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

const DestinationCard = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #8338ec14;
  border-radius: 1rem;
  transition: 0.3s ease-in-out;

  &:hover {
    transform: translateX(0.4rem) translateY(-1rem);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  img {
    width: 100%;
    border-radius: 1rem;
  }
`;

const AddDestinationForm = styled.form`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;

  h2 {
    margin-bottom: 1rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.5rem;
    color: #fff;
  }

  input {
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
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

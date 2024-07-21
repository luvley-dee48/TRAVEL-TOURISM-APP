import React, { useEffect, useState } from 'react';
import styled from "styled-components";

export default function Destination() {
  const [destinations, setDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({
    name: '',
    description: '',
    image_url: ''
  });
  const [editDestination, setEditDestination] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    setUserRole(role);

    fetch("http://127.0.0.1:5555/destinations")
      .then(res => res.json())
      .then(data => {
        setDestinations(data);
        setFilteredDestinations(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editDestination) {
      setEditDestination({ ...editDestination, [name]: value });
    } else {
      setNewDestination({ ...newDestination, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editDestination) {
      handleEdit(editDestination.id, editDestination);
    } else {
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
          setFormVisible(false);
          setFilteredDestinations([...destinations, data]); // Update filtered list as well
        })
        .catch(err => console.error(err));
    }
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5555/destinations/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setDestinations(destinations.filter(destination => destination.id !== id));
        setFilteredDestinations(filteredDestinations.filter(destination => destination.id !== id)); // Update filtered list as well
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
        setFilteredDestinations(filteredDestinations.map(destination =>
          destination.id === id ? data : destination
        )); // Update filtered list as well
        setEditDestination(null);
      })
      .catch(err => console.error(err));
  };

  const startEditing = (destination) => {
    setEditDestination(destination);
    setNewDestination({ name: destination.name, description: destination.description, image_url: destination.image_url });
    setFormVisible(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredDestinations(destinations); // Reset to full list
    } else {
      setFilteredDestinations(
        destinations.filter(destination =>
          destination.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const handleShare = (destination) => {
    if (navigator.share) {
      navigator.share({
        title: destination.name,
        text: destination.description,
        url: destination.image_url,
      })
      .catch((err) => console.error('Error sharing:', err));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const handleReturnToDestinations = () => {
    setFilteredDestinations(destinations); // Reset filtered destinations to full list
  };

  return (
    <Section>
      <div className="title">
        <h1>Destinations</h1>
        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            placeholder="Search Destinations..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <SearchButton type="submit">Search</SearchButton>
        </SearchForm>
        {userRole === "admin" && (
          <>
            <ToggleButton onClick={() => setFormVisible(prev => !prev)}>
              {formVisible ? "Hide Form" : "Add New Destination"}
            </ToggleButton>
            <ReturnButton onClick={handleReturnToDestinations}>Return to Destinations</ReturnButton>
          </>
        )}
      </div>
      {formVisible && userRole === "admin" && (
        <AddDestinationForm onSubmit={handleSubmit}>
          <h2>{editDestination ? "Edit Destination" : "Add a New Destination"}</h2>
          <InputContainer>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={editDestination ? editDestination.name : newDestination.name} onChange={handleChange} />
          </InputContainer>
          <InputContainer>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={editDestination ? editDestination.description : newDestination.description} onChange={handleChange} />
          </InputContainer>
          <InputContainer>
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" name="image_url" value={editDestination ? editDestination.image_url : newDestination.image_url} onChange={handleChange} />
          </InputContainer>
          <Button type="submit">{editDestination ? "Update Destination" : "Add Destination"}</Button>
        </AddDestinationForm>
      )}
      {filteredDestinations.length > 0 ? (
        <DestinationsGrid>
          {filteredDestinations.map(destination => (
            <DestinationCard key={destination.id}>
              <img src={destination.image_url} alt={destination.name} />
              <h2>{destination.name}</h2>
              <p>{destination.description}</p>
              {userRole === "admin" ? (
                <>
                  <Button onClick={() => handleDelete(destination.id)}>Delete</Button>
                  <Button onClick={() => startEditing(destination)}>Edit</Button>
                </>
              ) : (
                <Button onClick={() => handleShare(destination)}>Share</Button>
              )}
            </DestinationCard>
          ))}
        </DestinationsGrid>
      ) : (
        <p>No destinations found.</p>
      )}
    </Section>
  );
}

const Section = styled.section`
  padding: 2rem 0;
  .title {
    text-align: center;
    position: relative;
  }
`;



const ToggleButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
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
  margin: 2rem auto;
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

const ReturnButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem;

  &:hover {
    background-color: #bd2130;
  }
`;

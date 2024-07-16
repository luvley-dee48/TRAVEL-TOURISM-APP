import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import homeImage from "../assets/hero.png";

export default function ViewTrips() {
    const [bookedTrips, setBookedTrips] = useState([]);

    // Simulated data fetching
    useEffect(() => {
        // Replace with actual API call or data fetching logic
        const fetchData = async () => {
            // Mock data for booked trips
            const mockData = [
                { id: 1, destination: "Paris", startDate: "2024-07-20", endDate: "2024-07-25" },
                { id: 2, destination: "New York", startDate: "2024-08-05", endDate: "2024-08-10" },
                { id: 3, destination: "Tokyo", startDate: "2024-09-15", endDate: "2024-09-20" },
            ];

            setBookedTrips(mockData);
        };

        fetchData();
    }, []);

    const handleDeleteTrip = (id) => {
        const updatedTrips = bookedTrips.filter(trip => trip.id !== id);
        setBookedTrips(updatedTrips);
        // add code here to delete the trip from the server using an API call
    };

    const handleEditTrip = (id) => {
        alert(`Edit trip with ID ${id}`);
    };

    return (
        <TripSection id="trips">
            <Background>
                <img src={homeImage} alt="Background" />
            </Background>
            <Content>
                <Title>
                    <h2>bon voyage</h2>
                </Title>
                <BookedTrips>
                    <h2>Booked Trips</h2>
                    <TripList>
                        {bookedTrips.map(trip => (
                            <TripItem key={trip.id}>
                                <p><strong>Destination:</strong> {trip.destination}</p>
                                <p><strong>Start Date:</strong> {trip.startDate}</p>
                                <p><strong>End Date:</strong> {trip.endDate}</p>
                                <Button onClick={() => handleDeleteTrip(trip.id)}>Delete</Button>
                                <Button onClick={() => handleEditTrip(trip.id)}>Edit</Button>
                            </TripItem>
                        ))}
                    </TripList>
                </BookedTrips>
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

const BookedTrips = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 1rem;
    border-radius: 10px;
    margin-top: 2rem;
    width: 100%;
    max-width: 800px;
`;

const TripList = styled.div`
    display: grid;
    gap: 1rem;
`;

const TripItem = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 5px;
    position: relative;
`;

const Button = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-left: 0.5rem;

    &:hover {
        background-color: #0056b3;
    }
`;

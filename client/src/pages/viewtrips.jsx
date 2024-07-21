import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ViewTrips() {
    const [bookedTrips, setBookedTrips] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const role = sessionStorage.getItem("role");

    useEffect(() => {
        // Redirect if the user is not an admin
        if (role !== "admin") {
            navigate("/");
            return;
        }

        const fetchData = async () => {
            try {
                const tripsResponse = await fetch("http://127.0.0.1:5555/planned_trips");
                if (!tripsResponse.ok) {
                    throw new Error("Failed to fetch trips");
                }
                const tripsData = await tripsResponse.json();
                setBookedTrips(tripsData);

                const destinationsResponse = await fetch("http://127.0.0.1:5555/destinations"); // Correct endpoint
                if (!destinationsResponse.ok) {
                    throw new Error("Failed to fetch destinations");
                }
                const destinationsData = await destinationsResponse.json();
                setDestinations(destinationsData);

                const usersResponse = await fetch("http://127.0.0.1:5555/users");
                if (!usersResponse.ok) {
                    throw new Error("Failed to fetch users");
                }
                const usersData = await usersResponse.json();
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [role, navigate]);

    const handleDeleteTrip = async (id) => {
        console.log(`Deleting trip with ID: ${id}`);
        try {
            const response = await fetch(`http://127.0.0.1:5555/planned_trips/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Failed to delete trip:", errorText);
                throw new Error("Failed to delete trip");
            }

            setBookedTrips(currentTrips => currentTrips.filter(trip => trip.id !== id));
            console.log(`Trip with ID: ${id} deleted successfully`);
        } catch (error) {
            console.error("Error deleting trip:", error);
            alert("Error deleting trip. See console for details.");
        }
    };

    const handleEditTrip = (id) => {
        console.log(`Editing trip with ID: ${id}`);
        alert(`Edit trip with ID ${id}`);
    };

    const getDestinationName = (id) => {
        const trip = bookedTrips.find(trip => trip.id === id);
        if (!trip) return "Unknown Trip";

        const destination = destinations.find(dest => dest.id === trip.destination_id);
        if (!destination) return "Unknown Destination";

        const user = users.find(user => user.id === trip.user_id);
        const userName = user ? `${user.first_name} ${user.last_name}` : "Unknown User";

        return `${destination.name} (Booked by ${userName})`;
    };

    return (
        <TripSection id="trips">
            <Content>
                <Title>
                    <h2>Bon Voyage</h2>
                </Title>
                <BookedTrips>
                    <h2>Booked Trips</h2>
                    <TripList>
                        {bookedTrips.map(trip => (
                            <TripItem key={trip.id}>
                                <p><strong>Destination:</strong> {getDestinationName(trip.id)}</p>
                                <p><strong>Start Date:</strong> {trip.start_date}</p>
                                <p><strong>End Date:</strong> {trip.end_date}</p>
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
    padding-top: 60px;
`;

const Content = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1rem;
`;

const Title = styled.div`
    color: #000;
    text-align: left;

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
    max-width: 100%;
`;

const TripList = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const TripItem = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 5px;
    position: relative;
    flex: 1;
    min-width: 300px;
    box-sizing: border-box;
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

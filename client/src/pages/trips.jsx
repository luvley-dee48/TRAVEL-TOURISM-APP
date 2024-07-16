import React from 'react';
import styled from "styled-components";
import homeImage from "../assets/hero.png";


export default function Trips() {
    return (
        <TripSection id="trips">
            <Background>
                <img src={homeImage} alt="Background" />
            </Background>
            <Content>
                <Title>
                    <h2>Book a trip with us today</h2>
                </Title>
                <Search>
                    <Container>
                        <label htmlFor="destination">Enter Destination</label>
                        <input type="text" id="destination" placeholder="Search Your location" />
                    </Container>
                    <Container>
                        <label htmlFor="start-date">Start-date</label>
                        <input type="date" id="start-date" />
                    </Container>
                    <Container>
                        <label htmlFor="end-date">End-date</label>
                        <input type="date" id="end-date" />
                    </Container>
                    <Button>Book Trip</Button>
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

const Search = styled.div`
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

  &:hover {
    background-color: #0056b3;
  }
`;
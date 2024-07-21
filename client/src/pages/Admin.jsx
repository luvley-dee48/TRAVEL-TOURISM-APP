// src/pages/home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import homeImage from "../assets/hero.png";
import Navbar from "../components/Navbar"; 

export default function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <HeroSection id="hero">
        <Background>
          <img src={homeImage} alt="Background" />
        </Background>
        <Content>
          <Title>
            <h1>Welcome To Tours & Travel</h1>
            <p>
              We are dedicated to providing every customer with the safest and most reliable mode of transport to the most desired destination of your choice.
            </p>
          </Title>
          <ButtonGroup>
            <LoginButton onClick={() => navigate("/login")}>Login</LoginButton>
            <SignupButton onClick={() => navigate("/sign-up")}>Signup</SignupButton>
          </ButtonGroup>
        </Content>
      </HeroSection>
    </>
  );
}

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url(${homeImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Background = styled.div`
  height: 100%;
  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    filter: brightness(60%);
  }
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 3;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.div`
  color: white;
  h1 {
    font-size: 3rem;
    letter-spacing: 0.2rem;
  }
  p {
    text-align: center;
    padding: 0 30vw;
    margin-top: 0.5rem;
    font-size: 1.2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const LoginButton = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 1rem;
  border: none;
  color: white;
  background-color: #48cae4;
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #023e8a;
  }
`;

const SignupButton = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 1rem;
  border: none;
  color: white;
  background-color: #48cae4;
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #023e8a;
  }
`;

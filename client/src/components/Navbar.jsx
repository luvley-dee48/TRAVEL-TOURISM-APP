import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";


export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);
 


  return (
    <>
      <StyledNav>
        <Brand>
          <LogoContainer>
            <img src={logo} alt="Logo" />
            Tours & Travel
          </LogoContainer>
          <ToggleIcon onClick={() => setNavbarState((prev) => !prev)}>
            {navbarState ? <VscChromeClose /> : <GiHamburgerMenu />}
          </ToggleIcon>
        </Brand>
        <NavLinks>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/destinations">Destinations</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/trips">BookTrip</Link></li>
          <li><Link to="/viewtrips">ViewTrips</Link></li>
        </NavLinks>
      </StyledNav>

    </>
  );
}

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LogoContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
`;

const ToggleIcon = styled.div`
  display: none;

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    display: block;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 1rem;
  list-style-type: none;

  li {
    a {
      text-decoration: none;
      color: #0077b6;
      font-size: 1.2rem;
      transition: 0.1s ease-in-out;

      &:hover {
        color: #023e8a;
      }
    }

    &:first-of-type a {
      color: #023e8a;
      font-weight: 900;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    display: none;
  }
`;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);
  const [sidebarState, setSidebarState] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setRole(userRole);
  }, []);

  return (
    <>
      <StyledNav>
        <Brand>
          <LogoContainer>
            <img src={logo} alt="Logo" />
            Travel Wise
          </LogoContainer>
          <ToggleIcon onClick={() => setNavbarState((prev) => !prev)}>
            {navbarState ? <VscChromeClose /> : <GiHamburgerMenu />}
          </ToggleIcon>
        </Brand>
        <NavLinks>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          {role === "admin" && <li><Link to="/viewtrips">View Trips</Link></li>}
        </NavLinks>
      </StyledNav>
      <SidebarToggle onClick={() => setSidebarState((prev) => !prev)}>
        Dashboard
      </SidebarToggle>
      <Sidebar state={sidebarState}>
        <SidebarLinks>
          <li><Link to="/destinations">Destinations</Link></li>
          {role === "user" && (
            <>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/trips">Trips</Link></li>
            </>
          )}
          {role === "admin" && (
            <>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/trips">Trips</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
            </>
          )}
        </SidebarLinks>
      </Sidebar>
    </>
  );
}

// Styling components remain the same


const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  margin-left: 5.5rem;
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

const SidebarToggle = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background-color: #0077b6;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #023e8a;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ state }) => (state ? '250px' : '0')};
  background-color: #ffffff;
  overflow-x: hidden;
  transition: 0.3s;
  padding-top: 60px;
  box-shadow: ${({ state }) => (state ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none')};
  z-index: 999;
`;

const SidebarLinks = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    padding: 8px 16px;
    text-align: left;

    a {
      text-decoration: none;
      color: #0077b6;
      font-size: 1.2rem;
      display: block;
      transition: 0.3s;

      &:hover {
        color: #023e8a;
      }
    }
  }
`;

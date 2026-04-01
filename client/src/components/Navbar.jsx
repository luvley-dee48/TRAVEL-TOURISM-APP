import React, { useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');
`;

const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export default function Navbar() {
  const [navbarState, setNavbarState] = useState(false);
  const [sidebarState, setSidebarState] = useState(false);
  const [role, setRole] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setRole(userRole);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <>
      <GlobalFonts />

      <StyledNav scrolled={scrolled}>
        <NavInner>

          {/* Dashboard trigger — lives inside the navbar on the left */}
          <DashboardBtn onClick={() => setSidebarState(p => !p)}>
            <DashIcon>☰</DashIcon>
            <span>Dashboard</span>
          </DashboardBtn>

          <Brand to="/">
            <LogoMark>TW</LogoMark>
            <BrandName>Travel Wise</BrandName>
          </Brand>

          <NavLinks>
            <NavItem><StyledLink to="/">Home</StyledLink></NavItem>
            <NavItem><StyledLink to="/services">Services</StyledLink></NavItem>
            {role === "admin" && (
              <NavItem><StyledLink to="/viewtrips">View Trips</StyledLink></NavItem>
            )}
          </NavLinks>

          <Actions>
            <LogoutButton onClick={handleLogout}>
              <span>Logout</span>
              <Arrow>→</Arrow>
            </LogoutButton>
            <Hamburger onClick={() => setNavbarState(p => !p)}>
              {navbarState ? <VscChromeClose /> : <GiHamburgerMenu />}
            </Hamburger>
          </Actions>

        </NavInner>

        {navbarState && (
          <MobileMenu>
            <MobileLink to="/"         onClick={() => setNavbarState(false)}>Home</MobileLink>
            <MobileLink to="/services" onClick={() => setNavbarState(false)}>Services</MobileLink>
            {role === "admin" && (
              <MobileLink to="/viewtrips" onClick={() => setNavbarState(false)}>View Trips</MobileLink>
            )}
            <MobileDash onClick={() => { setSidebarState(p => !p); setNavbarState(false); }}>
              ☰ Dashboard
            </MobileDash>
            <MobileLogout onClick={handleLogout}>Logout →</MobileLogout>
          </MobileMenu>
        )}
      </StyledNav>

      {/* Sidebar overlay */}
      {sidebarState && <Overlay onClick={() => setSidebarState(false)} />}

      {/* Sidebar drawer */}
      <Sidebar open={sidebarState}>
        <SidebarHeader>
          <SidebarTitle>Navigation</SidebarTitle>
          <CloseBtn onClick={() => setSidebarState(false)}>✕</CloseBtn>
        </SidebarHeader>

        <SidebarSection>
          <SectionLabel>Explore</SectionLabel>
          <SidebarLink to="/destinations" onClick={() => setSidebarState(false)}>
            <LinkIcon>◈</LinkIcon> Destinations
          </SidebarLink>
        </SidebarSection>

        {role === "user" && (
          <SidebarSection>
            <SectionLabel>My Account</SectionLabel>
            <SidebarLink to="/reviews"  onClick={() => setSidebarState(false)}><LinkIcon>★</LinkIcon> Reviews</SidebarLink>
            <SidebarLink to="/services" onClick={() => setSidebarState(false)}><LinkIcon>◎</LinkIcon> Services</SidebarLink>
            <SidebarLink to="/trips"    onClick={() => setSidebarState(false)}><LinkIcon>✈</LinkIcon> My Trips</SidebarLink>
          </SidebarSection>
        )}

        {role === "admin" && (
          <SidebarSection>
            <SectionLabel>Admin</SectionLabel>
            <SidebarLink to="/users"   onClick={() => setSidebarState(false)}><LinkIcon>👤</LinkIcon> Users</SidebarLink>
            <SidebarLink to="/trips"   onClick={() => setSidebarState(false)}><LinkIcon>✈</LinkIcon> Trips</SidebarLink>
            <SidebarLink to="/reviews" onClick={() => setSidebarState(false)}><LinkIcon>★</LinkIcon> Reviews</SidebarLink>
          </SidebarSection>
        )}

        <SidebarFooter>
          <FooterLogout onClick={handleLogout}>Sign out →</FooterLogout>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

/* ── Styled Components ── */

const StyledNav = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 900;
  background: ${({ scrolled }) => scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.78)"};
  backdrop-filter: blur(16px);
  border-bottom: 1px solid ${({ scrolled }) => scrolled ? "rgba(0,119,182,0.14)" : "transparent"};
  box-shadow: ${({ scrolled }) => scrolled ? "0 2px 24px rgba(0,60,120,0.07)" : "none"};
  transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
  font-family: 'DM Sans', sans-serif;
  animation: ${fadeDown} 0.45s ease both;
`;

const NavInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 68px;
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

/* ── Dashboard button — inside the navbar ── */
const DashboardBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(2, 62, 138, 0.07);
  color: #023e8a;
  border: 1px solid rgba(0, 119, 182, 0.18);
  padding: 0.38rem 0.85rem;
  border-radius: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;

  &:hover {
    background: rgba(0, 119, 182, 0.12);
    border-color: rgba(0, 119, 182, 0.35);
    color: #0077b6;
    box-shadow: 0 2px 8px rgba(0, 119, 182, 0.1);
  }

  @media (max-width: 768px) { display: none; }
`;

const DashIcon = styled.span`
  font-size: 0.9rem;
  line-height: 1;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  flex-shrink: 0;
`;

const LogoMark = styled.div`
  width: 36px; height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #0077b6, #023e8a);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  flex-shrink: 0;
`;

const BrandName = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: #023e8a;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  list-style: none;
  margin: 0; padding: 0;
  flex: 1;
  @media (max-width: 768px) { display: none; }
`;

const NavItem = styled.li``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;
  &:hover { color: #0077b6; background: rgba(0,119,182,0.07); }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
  flex-shrink: 0;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  color: #ffffff;
  border: none;
  padding: 0.42rem 1.1rem;
  border-radius: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: filter 0.2s, box-shadow 0.2s, transform 0.15s;

  &:hover {
    filter: brightness(1.15);
    box-shadow: 0 4px 16px rgba(0, 119, 182, 0.35);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) { display: none; }
`;

const Arrow = styled.span`
  font-size: 1rem;
  transition: transform 0.2s;
  ${LogoutButton}:hover & { transform: translateX(3px); }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: 1px solid rgba(0,119,182,0.25);
  border-radius: 6px;
  padding: 0.4rem 0.5rem;
  color: #0077b6;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: rgba(0,119,182,0.07); }
  @media (max-width: 768px) { display: flex; align-items: center; }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(0,119,182,0.1);
  padding: 0.75rem 2rem 1rem;
  gap: 0.15rem;
  animation: ${fadeDown} 0.2s ease both;
`;

const MobileLink = styled(Link)`
  text-decoration: none;
  color: #4a5568;
  font-size: 0.95rem;
  padding: 0.6rem 0.5rem;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
  &:hover { color: #0077b6; background: rgba(0,119,182,0.06); }
`;

const MobileDash = styled.button`
  background: none;
  border: none;
  text-align: left;
  color: #023e8a;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  padding: 0.6rem 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
  &:hover { background: rgba(0,119,182,0.06); }
`;

const MobileLogout = styled.button`
  background: none;
  border: none;
  text-align: left;
  color: #e63946;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  padding: 0.6rem 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
  &:hover { background: rgba(230,57,70,0.06); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 998;
  background: rgba(2,32,74,0.22);
  backdrop-filter: blur(2px);
`;

const Sidebar = styled.aside`
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 999;
  width: 260px;
  background: #fff;
  border-right: 1px solid rgba(0,119,182,0.1);
  box-shadow: 4px 0 32px rgba(0,60,120,0.1);
  display: flex;
  flex-direction: column;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.32s cubic-bezier(.4,0,.2,1);
  font-family: 'DM Sans', sans-serif;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(0,119,182,0.08);
`;

const SidebarTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #023e8a;
  margin: 0;
  letter-spacing: 0.03em;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
  &:hover { color: #023e8a; background: rgba(0,119,182,0.08); }
`;

const SidebarSection = styled.div`
  padding: 1rem 1.5rem 0.5rem;
`;

const SectionLabel = styled.p`
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #aab4c4;
  margin: 0 0 0.5rem;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: #374151;
  font-size: 0.92rem;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.15rem;
  transition: color 0.2s, background 0.2s, transform 0.15s;
  &:hover { color: #0077b6; background: rgba(0,119,182,0.07); transform: translateX(3px); }
`;

const LinkIcon = styled.span`
  font-size: 0.8rem;
  opacity: 0.6;
  width: 16px;
  text-align: center;
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid rgba(0,119,182,0.08);
`;

const FooterLogout = styled.button`
  background: none;
  border: 1px solid rgba(230,57,70,0.3);
  color: #e63946;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  padding: 0.55rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: background 0.2s, border-color 0.2s;
  &:hover { background: rgba(230,57,70,0.06); border-color: #e63946; }
`;
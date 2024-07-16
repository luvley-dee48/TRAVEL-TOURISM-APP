import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function ScrollToTop() {
    const [scrollState, setScrollState] = useState(false);

    const toTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollState(window.pageYOffset > 200);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <StyledToTop onClick={toTop} $show={scrollState}>
            <img src={logo} alt="Scroll to top" />
        </StyledToTop>
    );
}

const StyledToTop = styled.div`
  display: ${({ $show }) => ($show ? "block" : "none")};
  position: fixed;
  cursor: pointer;
  z-index: 10;
  bottom: 1rem;
  right: 2rem;
  img {
    height: 1.5rem;
  }
  border-radius: 2rem;
  background-color: #1900ff39;
  padding: 1rem;
`;

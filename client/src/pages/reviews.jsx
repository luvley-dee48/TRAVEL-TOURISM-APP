import React from 'react';
import styled from "styled-components";
import avatarImage2 from "../assets/avatarimage2.jpg"
export default function Reviews() {
    return (
        <StyledSection id="reviews">
            <Title>
                <h2>Happy Customers</h2>
            </Title>
            <ReviewContainer>
                {reviews.map((review, index) => (
                    <Review key={index}>
                        <p>{review.text}</p>
                        <Info>
                            <img src={avatarImage2} alt={review.name} />
                            <Details>
                                <h4>{review.name}</h4>
                                <span>{review.role}</span>
                            </Details>
                        </Info>
                    </Review>
                ))}
            </ReviewContainer>
        </StyledSection>
    );
}

const reviews = [
    { text: "Absolutely fantastic experience!Also, a great way to experience the local culture.", name: "James Mbugua", role: "Developer - z-Gen coders" },
    { text: "Great experience!Can't recommend it enough.", name: "Sheldon Cooper", role: "Tourist" },
    { text: "An unforgettable experience.Worth every penny.", name: "Deborah Muoti", role: "Developer - z-Gen coders" },
    { text: "Highly recommend this to anyone visiting the area.", name: "Doc Obura", role: "Developer - z-Gen coders" }
];

const StyledSection = styled.section`
  margin: 5rem 0;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ReviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 2rem;
  gap: 2rem;

  @media screen and (min-width: 280px) and (max-width: 768px) {
    flex-direction: column;
    margin: 0;
  }
`;

const Review = styled.div`
  background-color: aliceblue;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transition: 0.3s ease-in-out;

  &:hover {
    transform: translateX(0.4rem) translateY(-1rem);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;

  img {
    border-radius: 3rem;
    height: 3rem;
  }

  @media screen and (min-width: 280px) and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const Details = styled.div`
  span {
    font-size: 0.9rem;
  }
`;
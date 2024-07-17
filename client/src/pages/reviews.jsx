import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import avatarImage2 from "../assets/avatarimage2.jpg";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch reviews from the backend
        fetch('http://127.0.0.1:5555/reviews')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setReviews(data);
            })
            .catch(error => {
                console.error("There was an error fetching the reviews!", error);
            });
    }, []);

    return (
        <StyledSection id="reviews">
            <Title>
                <h2>Happy Customers</h2>
            </Title>
            <ReviewContainer>
                {reviews.map((review) => (
                    <Review key={review.id}>
                        <Rating>Rating: {review.rating}</Rating>
                        <p>{review.comments}</p>
                        <Info>
                            <img src={avatarImage2} alt={review.user_name} />
                            <Details>
                                <h4>{review.user_name}</h4>  {/* Display user name */}
                                <span>{review.destination_title}</span>  {/* Display destination title */}
                            </Details>
                        </Info>
                    </Review>
                ))}
            </ReviewContainer>
        </StyledSection>
    );
}

const StyledSection = styled.section`
  margin: 5rem 0;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 0 2rem;
`;

const Review = styled.div`
  background-color: aliceblue;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transition: 0.3s ease-in-out;
  width: 100%;
  max-width: 600px;

  &:hover {
    transform: translateX(0.4rem) translateY(-1rem);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Rating = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  img {
    border-radius: 3rem;
    height: 3rem;
  }
`;

const Details = styled.div`
  span {
    font-size: 0.9rem;
  }
`;

import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import avatarImage2 from "../assets/avatarimage2.jpg"; // Default avatar image

export default function Reviews({ destinationId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comments: '',
    user_id: 1, // Replace with actual user ID
    destination_id: destinationId,
    destination_name: ''
  });

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/api/reviews/${destinationId}`);
      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, [destinationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview)
    });

    // Reset form and refetch reviews
    setNewReview({
      rating: 5,
      comments: '',
      user_id: 1,
      destination_id: destinationId,
      destination_name: ''
    });
    const response = await fetch(`/api/reviews/${destinationId}`);
    const data = await response.json();
    setReviews(data);
  };

  return (
    <StyledSection id="reviews">
      <Title>
        <h2>Happy Customers</h2>
      </Title>
      <ReviewContainer>
        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <UserInfo>
              <UserAvatar src={avatarImage2} alt="User Avatar" />
              <UserDetails>
                <h4>{review.user_id}</h4>
                <span>User Role</span> {/* Replace with actual role if available */}
              </UserDetails>
            </UserInfo>
            <Rating>Rating: {review.rating}</Rating>
            <p>{review.comments}</p>
          </ReviewCard>
        ))}
      </ReviewContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="destination_name"
          placeholder="Destination Name"
          value={newReview.destination_name}
          onChange={handleChange}
          required
        />
        <RatingContainer>
          <label htmlFor="rating">Rating:</label>
          <Select
            name="rating"
            value={newReview.rating}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </Select>
        </RatingContainer>
        <Textarea
          name="comments"
          placeholder="Write your review here"
          value={newReview.comments}
          onChange={handleChange}
          required
        />
        <Button type="submit">Submit Review</Button>
      </Form>
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
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 2rem;
  gap: 2rem;
`;

const ReviewCard = styled.div`
  background-color: aliceblue;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 300px; // Fixed width for cards
  transition: 0.3s ease-in-out;

  &:hover {
    transform: translateY(-1rem);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const UserAvatar = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-right: 1rem;
`;

const UserDetails = styled.div`
  h4 {
    margin: 0;
  }
  
  span {
    font-size: 0.9rem;
    color: gray;
  }
`;

const Rating = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

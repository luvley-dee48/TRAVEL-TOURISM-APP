import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from "styled-components";
import avatarImage2 from "../assets/avatarimage2.jpg";
import Navbar from "../components/Navbar";

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/reviews')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setReviews(data);
        setLoaded(true);
      })
      .catch(error => {
        console.error("There was an error fetching the reviews!", error);
        setLoaded(true);
      });
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} filled={i < rating}>★</Star>
    ));
  };

  return (
    <>
      <GlobalFonts />
      <Navbar />
      <PageWrapper>
        {/* Subtle background texture */}
        <BgAccent />

        <HeroSection>
          <Eyebrow>Testimonials</Eyebrow>
          <HeroTitle>What Our Travellers Say</HeroTitle>
          <HeroSub>
            Real stories from real adventurers — unfiltered and unforgettable.
          </HeroSub>
          <TitleDivider>
            <span />
            <Diamond>◆</Diamond>
            <span />
          </TitleDivider>
        </HeroSection>

        <ReviewGrid loaded={loaded}>
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} delay={`${index * 0.07}s`}>
              <QuoteMark>"</QuoteMark>
              <CommentText>{review.comments}</CommentText>
              <CardFooter>
                <StarsRow>{renderStars(review.rating)}</StarsRow>
                <Divider />
                <AuthorRow>
                  <AvatarWrapper>
                    <img src={avatarImage2} alt={review.user_name} />
                  </AvatarWrapper>
                  <AuthorInfo>
                    <AuthorName>{review.user_name}</AuthorName>
                    <DestinationTag>
                      <PinIcon>✦</PinIcon>
                      {review.destination_title}
                    </DestinationTag>
                  </AuthorInfo>
                </AuthorRow>
              </CardFooter>
            </ReviewCard>
          ))}
        </ReviewGrid>

        {reviews.length === 0 && loaded && (
          <EmptyState>
            <EmptyIcon>✈</EmptyIcon>
            <p>No reviews yet. Be the first to share your journey.</p>
          </EmptyState>
        )}
      </PageWrapper>
    </>
  );
}

/* ── Animations ── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

/* ── Layout ── */
const PageWrapper = styled.main`
  min-height: 100vh;
  background: #f8f6f1;
  padding: 6rem 2rem 5rem;
  font-family: 'DM Sans', sans-serif;
  position: relative;
  overflow: hidden;
`;

const BgAccent = styled.div`
  position: absolute;
  top: -120px;
  right: -180px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,119,182,0.06) 0%, transparent 70%);
  pointer-events: none;
`;

/* ── Hero ── */
const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeIn} 0.6s ease both;
`;

const Eyebrow = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0077b6;
  margin: 0 0 0.75rem;
`;

const HeroTitle = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 600;
  color: #0d1f3c;
  margin: 0 0 1rem;
  line-height: 1.15;
  letter-spacing: -0.01em;
`;

const HeroSub = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #6b7280;
  max-width: 440px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
`;

const TitleDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;

  span {
    display: block;
    width: 60px;
    height: 1px;
    background: rgba(0,119,182,0.25);
  }
`;

const Diamond = styled.span`
  font-size: 0.5rem;
  color: #0077b6;
  opacity: 0.6;
`;

/* ── Grid ── */
const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
  max-width: 1100px;
  margin: 0 auto;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transition: opacity 0.3s;
`;

/* ── Card ── */
const ReviewCard = styled.article`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem 2rem 1.75rem;
  border: 1px solid rgba(0, 119, 182, 0.08);
  box-shadow: 0 2px 16px rgba(0, 40, 100, 0.06);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  animation: ${fadeUp} 0.5s ease both;
  animation-delay: ${({ delay }) => delay};
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 36px rgba(0, 60, 130, 0.12);
    border-color: rgba(0, 119, 182, 0.2);
  }
`;

const QuoteMark = styled.span`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 4rem;
  font-style: italic;
  color: rgba(0, 119, 182, 0.1);
  line-height: 1;
  pointer-events: none;
  user-select: none;
`;

const CommentText = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.08rem;
  font-weight: 400;
  color: #2d3748;
  line-height: 1.75;
  margin: 0;
  flex: 1;
  font-style: italic;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const StarsRow = styled.div`
  display: flex;
  gap: 0.1rem;
`;

const Star = styled.span`
  font-size: 0.9rem;
  color: ${({ filled }) => (filled ? "#d4af37" : "#e2e8f0")};
  transition: color 0.2s;
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, rgba(0,119,182,0.12), transparent);
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

const AvatarWrapper = styled.div`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0, 119, 182, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const AuthorName = styled.h4`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #0d1f3c;
  margin: 0;
`;

const DestinationTag = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  color: #0077b6;
  letter-spacing: 0.02em;
`;

const PinIcon = styled.span`
  font-size: 0.45rem;
  opacity: 0.7;
`;

/* ── Empty state ── */
const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #9ca3af;
  animation: ${fadeIn} 0.4s ease both;

  p {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    margin-top: 0.75rem;
  }
`;

const EmptyIcon = styled.div`
  font-size: 2.5rem;
  opacity: 0.3;
`;
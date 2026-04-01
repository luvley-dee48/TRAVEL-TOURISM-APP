import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from "styled-components";
import homeImage from "../assets/hero.png";
import Navbar from "../components/Navbar";

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');
`;

export default function Trips() {
  const [name, setName] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const userId = 1;

  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await fetch("http://127.0.0.1:5555/destinations");
      const data = await response.json();
      setDestinations(data);
    };
    fetchDestinations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const selectedDestination = destinations.find(dest => dest.name === destinationId);
    const response = await fetch("http://127.0.0.1:5555/book_trip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        name,
        destination_id: selectedDestination?.id,
        start_date: startDate,
        end_date: endDate,
      }),
    });

    if (response.ok) {
      setStatus('success');
      setName('');
      setDestinationId('');
      setStartDate('');
      setEndDate('');
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      <GlobalFonts />
      <Navbar />
      <PageWrapper>
        {/* Background image */}
        <HeroBg>
          <img src={homeImage} alt="Travel destination" />
          <Overlay />
        </HeroBg>

        {/* Centered form card */}
        <CenterStage>
          <CardHeader>
            <Eyebrow>Travel Wise</Eyebrow>
            <CardTitle>Plan Your Journey</CardTitle>
            <CardSub>Tell us where you want to go — we'll handle the rest.</CardSub>
            <HeaderDivider>
              <span /><Diamond>◆</Diamond><span />
            </HeaderDivider>
          </CardHeader>

          <BookingForm onSubmit={handleSubmit}>
            <FieldRow>
              <Field>
                <FieldLabel htmlFor="name">Your Name</FieldLabel>
                <FieldInput
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="destination">Destination</FieldLabel>
                <FieldSelect
                  id="destination"
                  value={destinationId}
                  onChange={(e) => setDestinationId(e.target.value)}
                  required
                >
                  <option value="">Select a destination</option>
                  {destinations.map((dest) => (
                    <option key={dest.id} value={dest.name}>{dest.name}</option>
                  ))}
                </FieldSelect>
              </Field>
            </FieldRow>

            <FieldRow>
              <Field>
                <FieldLabel htmlFor="start-date">Departure Date</FieldLabel>
                <FieldInput
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="end-date">Return Date</FieldLabel>
                <FieldInput
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </Field>
            </FieldRow>

            {status === 'success' && (
              <StatusBanner success>
                ✓ &nbsp;Your trip has been booked! Safe travels.
              </StatusBanner>
            )}
            {status === 'error' && (
              <StatusBanner>
                ✕ &nbsp;Something went wrong. Please try again.
              </StatusBanner>
            )}

            <SubmitBtn type="submit">
              <span>Book My Trip</span>
              <BtnArrow>→</BtnArrow>
            </SubmitBtn>
          </BookingForm>
        </CenterStage>

        {/* Bottom badge */}
        <BottomBadge>
          <span>✦</span> Trusted by thousands of travellers worldwide <span>✦</span>
        </BottomBadge>
      </PageWrapper>
    </>
  );
}

/* ── Animations ── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

/* ── Layout ── */
const PageWrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1.5rem 3rem;
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(5, 15, 35, 0.78) 0%,
    rgba(2, 30, 65, 0.65) 50%,
    rgba(0, 60, 100, 0.55) 100%
  );
`;

/* ── Center card ── */
const CenterStage = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 700px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 32px 80px rgba(0, 20, 60, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.15);
  animation: ${fadeUp} 0.6s cubic-bezier(0.2, 0.8, 0.3, 1) both;
`;

/* ── Card header ── */
const CardHeader = styled.div`
  background: linear-gradient(135deg, #0a1428 0%, #0d2348 60%, #0077b6 100%);
  padding: 2.25rem 2.5rem 2rem;
  text-align: center;
`;

const Eyebrow = styled.p`
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.8);
  margin: 0 0 0.5rem;
`;

const CardTitle = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.6rem;
  letter-spacing: -0.01em;
  line-height: 1.15;
`;

const CardSub = styled.p`
  font-size: 0.88rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
  line-height: 1.5;
`;

const HeaderDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.25rem;

  span {
    display: block;
    width: 40px;
    height: 1px;
    background: rgba(212, 175, 55, 0.3);
  }
`;

const Diamond = styled.span`
  font-size: 0.42rem;
  color: rgba(212, 175, 55, 0.6);
`;

/* ── Form ── */
const BookingForm = styled.form`
  padding: 2.25rem 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const FieldLabel = styled.label`
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6b7280;
`;

const sharedInput = `
  width: 100%;
  padding: 0.7rem 0.9rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  font-weight: 400;
  color: #0d1f3c;
  background: #f8f9fb;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  box-sizing: border-box;

  &:focus {
    border-color: #0077b6;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const FieldInput = styled.input`${sharedInput}`;

const FieldSelect = styled.select`
  ${sharedInput}
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230077b6' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.9rem center;
  padding-right: 2.5rem;
`;

/* ── Status banner ── */
const StatusBanner = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 400;
  animation: ${fadeIn} 0.3s ease both;
  background: ${({ success }) => success ? "rgba(16, 185, 129, 0.08)" : "rgba(220, 53, 69, 0.08)"};
  border: 1px solid ${({ success }) => success ? "rgba(16, 185, 129, 0.25)" : "rgba(220, 53, 69, 0.25)"};
  color: ${({ success }) => success ? "#065f46" : "#991b1b"};
`;

/* ── Submit ── */
const SubmitBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.9rem 1.5rem;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  margin-top: 0.25rem;
  transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    filter: brightness(1.12);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 119, 182, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BtnArrow = styled.span`
  font-size: 1rem;
  transition: transform 0.2s;
  ${SubmitBtn}:hover & { transform: translateX(4px); }
`;

/* ── Bottom badge ── */
const BottomBadge = styled.p`
  position: relative;
  z-index: 2;
  margin-top: 2rem;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  animation: ${fadeIn} 0.8s 0.4s ease both;

  span { color: rgba(212, 175, 55, 0.5); font-size: 0.45rem; }
`;
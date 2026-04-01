import React, { useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import homeImage from "../assets/hero.png";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

const STATS = [
  { value: "120+", label: "Destinations" },
  { value: "15K+", label: "Happy Travellers" },
  { value: "98%",  label: "Satisfaction Rate" },
  { value: "12+",  label: "Years of Service" },
];

const FEATURES = [
  { icon: "✈", title: "Curated Routes",    desc: "Hand-picked itineraries designed by expert local guides." },
  { icon: "🛡", title: "Safe & Reliable",   desc: "Your safety is our top priority on every journey." },
  { icon: "◎",  title: "Best Value",        desc: "Premium experiences at prices that respect your budget." },
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <GlobalFonts />
      <Navbar />

      {/* ── HERO ── */}
      <HeroSection>
        <HeroBg>
          <img src={homeImage} alt="Travel destination" />
          <HeroOverlay />
        </HeroBg>

        {/* Decorative corner lines */}
        <CornerTL /><CornerBR />

        <HeroBody loaded={loaded}>
          <HeroEyebrow>
            <Line /><span>Discover the World</span><Line />
          </HeroEyebrow>

          <HeroTitle>
            Where Every<br />
            <ItalicWord>Journey</ItalicWord> Begins
          </HeroTitle>

          <HeroSub>
            We craft unforgettable travel experiences — safe, seamless, and tailored
            to every destination you've ever dreamed of.
          </HeroSub>

          <HeroCTA>
            <PrimaryBtn as={Link} to="/trips">Book a Trip</PrimaryBtn>
            <GhostBtn as={Link} to="/destinations">Explore Destinations</GhostBtn>
          </HeroCTA>

          <ScrollHint>
            <ScrollDot />
            <span>Scroll to explore</span>
          </ScrollHint>
        </HeroBody>

        {/* Floating stats bar */}
        <StatsBar loaded={loaded}>
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              <StatItem delay={`${0.6 + i * 0.1}s`}>
                <StatValue>{s.value}</StatValue>
                <StatLabel>{s.label}</StatLabel>
              </StatItem>
              {i < STATS.length - 1 && <StatDivider />}
            </React.Fragment>
          ))}
        </StatsBar>
      </HeroSection>

      {/* ── WHY US ── */}
      <FeaturesSection>
        <FeaturesBg />
        <SectionEyebrow>Why Travel Wise</SectionEyebrow>
        <SectionTitle>Travel Better,<br /><em>Live More</em></SectionTitle>
        <SectionDivider><span /><Diamond>◆</Diamond><span /></SectionDivider>

        <FeatureGrid>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} delay={`${i * 0.12}s`}>
              <FeatureIconWrap>{f.icon}</FeatureIconWrap>
              <FeatureTitle>{f.title}</FeatureTitle>
              <FeatureDesc>{f.desc}</FeatureDesc>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesSection>

      {/* ── CALL TO ACTION BAND ── */}
      <CtaBand>
        <CtaInner>
          <CtaText>
            Ready to start your next adventure?
          </CtaText>
          <CtaBtn as={Link} to="/trips">Plan My Trip →</CtaBtn>
        </CtaInner>
      </CtaBand>
    </>
  );
}

/* ── Animations ── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50%       { transform: scaleY(0.5); opacity: 0.5; }
`;

/* ── HERO ── */
const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 680px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
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

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(4, 12, 30, 0.82) 0%,
    rgba(2, 25, 60, 0.70) 45%,
    rgba(0, 50, 90, 0.55) 100%
  );
`;

/* Decorative corner brackets */
const cornerBase = `
  position: absolute;
  z-index: 2;
  width: 48px;
  height: 48px;
  opacity: 0.35;
`;

const CornerTL = styled.div`
  ${cornerBase}
  top: 88px; left: 2rem;
  border-top: 1.5px solid #d4af37;
  border-left: 1.5px solid #d4af37;
`;

const CornerBR = styled.div`
  ${cornerBase}
  bottom: 100px; right: 2rem;
  border-bottom: 1.5px solid #d4af37;
  border-right: 1.5px solid #d4af37;
`;

const HeroBody = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 0 1.5rem;
  max-width: 820px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transition: opacity 0.1s;
`;

const HeroEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: ${fadeIn} 0.6s 0.1s ease both;
`;

const Line = styled.span`
  display: block;
  width: 36px;
  height: 1px;
  background: rgba(212, 175, 55, 0.6);
`;

const HeroEyebrowText = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.85);
`;

/* reuse span inside HeroEyebrow */
const eyebrowSpanStyle = `
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(212, 175, 55, 0.85);
`;

const HeroTitle = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 600;
  color: #ffffff;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.01em;
  animation: ${fadeUp} 0.7s 0.2s ease both;

  /* inline span styling via global, but we'll use a component */
`;

const ItalicWord = styled.em`
  font-style: italic;
  font-weight: 300;
  color: #d4af37;
`;

const HeroSub = styled.p`
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
  max-width: 520px;
  margin: 0;
  animation: ${fadeUp} 0.7s 0.35s ease both;
`;

const HeroCTA = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: ${fadeUp} 0.7s 0.48s ease both;
`;

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%);
  color: #fff;
  text-decoration: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    filter: brightness(1.15);
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0, 119, 182, 0.4);
  }
`;

const GhostBtn = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 2rem;
  background: transparent;
  color: rgba(255,255,255,0.88);
  text-decoration: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  border-radius: 8px;
  border: 1.5px solid rgba(255,255,255,0.3);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;

  &:hover {
    border-color: rgba(212, 175, 55, 0.6);
    color: #d4af37;
    background: rgba(212, 175, 55, 0.06);
  }
`;

const ScrollHint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  animation: ${fadeIn} 1s 1s ease both;

  span {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }
`;

const ScrollDot = styled.div`
  width: 2px;
  height: 22px;
  background: rgba(212, 175, 55, 0.5);
  border-radius: 2px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

/* ── Stats bar ── */
const StatsBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0; right: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 20, 42, 0.88);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(212, 175, 55, 0.15);
  padding: 1.25rem 2rem;
  gap: 0;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transform: ${({ loaded }) => (loaded ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.6s 0.7s ease, transform 0.6s 0.7s ease;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2.5rem;
  animation: ${fadeUp} 0.5s ${({ delay }) => delay} ease both;
`;

const StatValue = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.9rem;
  font-weight: 600;
  color: #d4af37;
  line-height: 1;
`;

const StatLabel = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-top: 0.3rem;
`;

const StatDivider = styled.div`
  width: 1px;
  height: 32px;
  background: rgba(212, 175, 55, 0.2);
  flex-shrink: 0;
`;

/* ── FEATURES ── */
const FeaturesSection = styled.section`
  position: relative;
  background: #f8f6f1;
  padding: 6rem 2rem;
  text-align: center;
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
`;

const FeaturesBg = styled.div`
  position: absolute;
  bottom: -80px;
  left: -100px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,119,182,0.055) 0%, transparent 70%);
  pointer-events: none;
`;

const SectionEyebrow = styled.p`
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0077b6;
  margin: 0 0 0.75rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  color: #0d1f3c;
  margin: 0 0 1rem;
  line-height: 1.2;

  em {
    font-style: italic;
    font-weight: 300;
    color: #0077b6;
  }
`;

const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 3.5rem;

  span {
    display: block;
    width: 50px;
    height: 1px;
    background: rgba(0, 119, 182, 0.2);
  }
`;

const Diamond = styled.span`
  font-size: 0.42rem;
  color: #0077b6;
  opacity: 0.5;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.75rem;
  max-width: 900px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 119, 182, 0.08);
  border-radius: 16px;
  padding: 2.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  box-shadow: 0 2px 16px rgba(0, 40, 100, 0.05);
  animation: ${slideUp} 0.55s ${({ delay }) => delay} ease both;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0, 60, 130, 0.1);
    border-color: rgba(0, 119, 182, 0.2);
  }
`;

const FeatureIconWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(0,119,182,0.1) 0%, rgba(2,62,138,0.08) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  border: 1px solid rgba(0, 119, 182, 0.12);
`;

const FeatureTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #0d1f3c;
  margin: 0;
`;

const FeatureDesc = styled.p`
  font-size: 0.88rem;
  font-weight: 300;
  color: #6b7280;
  line-height: 1.65;
  margin: 0;
  text-align: center;
`;

/* ── CTA BAND ── */
const CtaBand = styled.div`
  background: linear-gradient(135deg, #0a1428 0%, #0d2348 60%, #0077b6 100%);
  padding: 3.5rem 2rem;
  text-align: center;
  font-family: 'DM Sans', sans-serif;
`;

const CtaInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
`;

const CtaText = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-weight: 400;
  font-style: italic;
  color: rgba(255, 255, 255, 0.92);
  margin: 0;
  line-height: 1.4;
`;

const CtaBtn = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 2.2rem;
  background: #d4af37;
  color: #0a1428;
  text-decoration: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  border-radius: 8px;
  cursor: pointer;
  transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    filter: brightness(1.08);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.35);
  }
`;
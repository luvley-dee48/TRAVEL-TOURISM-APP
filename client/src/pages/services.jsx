import React from 'react';
import styled, { keyframes } from 'styled-components';

const services = [
  {
    icon: '💰',
    title: 'Best Price Guarantee',
    subTitle: 'Pay through our platform and save thousands with automatic price-matching and loyalty rewards.',
    badge: 'Save up to 40%',
    accent: '#4f7cff',
    iconBg: 'rgba(79,124,255,0.12)',
    iconBorder: 'rgba(79,124,255,0.25)',
    shadow: 'rgba(79,124,255,0.35)',
  },
  {
    icon: '🛡️',
    title: 'COVID-Safe Certified',
    subTitle: 'All curated hotels follow strict sanitization protocols for a fully covid-safe environment.',
    badge: 'Verified',
    accent: '#10b981',
    iconBg: 'rgba(16,185,129,0.12)',
    iconBorder: 'rgba(16,185,129,0.25)',
    shadow: 'rgba(16,185,129,0.35)',
  },
  {
    icon: '💳',
    title: 'Flexible Payments',
    subTitle: 'Split bills, pay later, or use crypto. Multiple payment methods with zero hidden fees.',
    badge: 'Buy now, pay later',
    accent: '#a855f7',
    iconBg: 'rgba(168,85,247,0.12)',
    iconBorder: 'rgba(168,85,247,0.25)',
    shadow: 'rgba(168,85,247,0.35)',
  },
  {
    icon: '📍',
    title: 'Discover Nearby',
    subTitle: 'Find top-rated hotels and experiences near you in a single tap using smart location search.',
    badge: 'GPS-powered',
    accent: '#f97316',
    iconBg: 'rgba(249,115,22,0.12)',
    iconBorder: 'rgba(249,115,22,0.25)',
    shadow: 'rgba(249,115,22,0.35)',
  },
  {
    icon: '⚡',
    title: 'Instant Booking',
    subTitle: 'Confirm your reservation in seconds. Real-time availability across thousands of properties.',
    badge: 'Sub-2s confirmation',
    accent: '#facc15',
    iconBg: 'rgba(250,204,21,0.12)',
    iconBorder: 'rgba(250,204,21,0.25)',
    shadow: 'rgba(250,204,21,0.35)',
  },
  {
    icon: '🤖',
    title: 'AI Concierge',
    subTitle: 'Get 24/7 smart recommendations, itinerary planning, and support powered by AI.',
    badge: 'AI-powered',
    accent: '#06e8c0',
    iconBg: 'rgba(6,232,192,0.12)',
    iconBorder: 'rgba(6,232,192,0.25)',
    shadow: 'rgba(6,232,192,0.35)',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    subTitle: 'End-to-end encrypted data. Your travel details and payment info are always protected.',
    badge: 'SOC 2 Type II',
    accent: '#3b82f6',
    iconBg: 'rgba(59,130,246,0.12)',
    iconBorder: 'rgba(59,130,246,0.25)',
    shadow: 'rgba(59,130,246,0.35)',
  },
  {
    icon: '🌍',
    title: 'Global Coverage',
    subTitle: 'Access 500,000+ properties across 150+ countries with localized pricing and support.',
    badge: '150+ countries',
    accent: '#ec4899',
    iconBg: 'rgba(236,72,153,0.12)',
    iconBorder: 'rgba(236,72,153,0.25)',
    shadow: 'rgba(236,72,153,0.35)',
  },
];

export default function Services() {
  return (
    <Section id="services">
      <Header>
        <Eyebrow>Everything you need</Eyebrow>
        <h2>Built for modern<br />travel experiences</h2>
        <p>A complete platform that handles pricing, safety, payments, and discovery — so you focus on the journey.</p>
      </Header>

      <Grid>
        {services.map(({ icon, title, subTitle, badge, accent, iconBg, iconBorder, shadow }, index) => (
          <Card key={index} $accent={accent} $iconBg={iconBg} $iconBorder={iconBorder} $shadow={shadow} $delay={index * 0.05}>
            <TopLine $accent={accent} />
            <IconWrap $iconBg={iconBg} $iconBorder={iconBorder} $shadow={shadow}>
              {icon}
            </IconWrap>
            <CardTitle>{title}</CardTitle>
            <CardBody>{subTitle}</CardBody>
            <Badge $accent={accent} $iconBg={iconBg}>✦ {badge}</Badge>
            <CardNum>0{index + 1}</CardNum>
          </Card>
        ))}
      </Grid>

      <Stats>
        {[
          { val: '2M+', label: 'Happy travelers' },
          { val: '99.9%', label: 'Uptime SLA' },
          { val: '150+', label: 'Countries covered' },
          { val: '4.9★', label: 'Average rating' },
        ].map(({ val, label }) => (
          <Stat key={label}>
            <StatVal>{val}</StatVal>
            <StatLabel>{label}</StatLabel>
          </Stat>
        ))}
      </Stats>
    </Section>
  );
}

/* ── Animations ── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.8); }
`;

/* ── Styled Components ── */
const Section = styled.section`
  padding: 6rem 2rem;
  background: #07080f;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(79,124,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(79,124,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }
`;

const Header = styled.div`
  text-align: center;
  max-width: 560px;
  position: relative;
  z-index: 1;

  h2 {
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: #f0f2ff;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #8a8fa8;
    line-height: 1.7;
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #4f7cff;
  background: rgba(79,124,255,0.1);
  border: 1px solid rgba(79,124,255,0.2);
  padding: 0.4rem 1rem;
  border-radius: 100px;
  margin-bottom: 1.5rem;

  &::before {
    content: '';
    width: 6px; height: 6px;
    background: #4f7cff;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  overflow: hidden;
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const TopLine = styled.span`
  position: absolute;
  top: 0; left: 0;
  height: 2px;
  width: 0;
  background: ${p => p.$accent};
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Card = styled.div`
  background: #0e1019;
  padding: 2.2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  position: relative;
  overflow: hidden;
  cursor: default;
  transition: background 0.3s ease;
  animation: ${fadeUp} 0.5s ease ${p => p.$delay}s both;

  &:hover {
    background: #111420;
  }

  &:hover ${TopLine} {
    width: 100%;
  }
`;

const IconWrap = styled.div`
  width: 48px; height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  background: ${p => p.$iconBg};
  border: 1px solid ${p => p.$iconBorder};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1) rotate(-4deg);
    box-shadow: 0 8px 24px ${p => p.$shadow};
  }
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #f0f2ff;
  line-height: 1.3;
`;

const CardBody = styled.p`
  font-size: 0.86rem;
  color: #8a8fa8;
  line-height: 1.65;
  font-weight: 300;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.$accent};
  background: ${p => p.$iconBg};
  padding: 0.2rem 0.65rem;
  border-radius: 100px;
  width: fit-content;
  margin-top: auto;
`;

const CardNum = styled.span`
  position: absolute;
  bottom: 1.5rem; right: 1.5rem;
  font-size: 3.5rem;
  font-weight: 800;
  color: rgba(255,255,255,0.025);
  line-height: 1;
  pointer-events: none;
  transition: color 0.4s ease;

  ${Card}:hover & { color: rgba(255,255,255,0.045); }
`;

const Stats = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatVal = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #f0f2ff;
`;

const StatLabel = styled.div`
  font-size: 0.78rem;
  color: #8a8fa8;
  margin-top: 0.2rem;
  letter-spacing: 0.05em;
`;
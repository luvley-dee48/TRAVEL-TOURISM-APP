import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function ViewTrips() {
  const [bookedTrips, setBookedTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    if (role !== 'admin') { navigate('/'); return; }
    const fetchData = async () => {
      try {
        const [tripsRes, destsRes, usersRes] = await Promise.all([
          fetch('http://127.0.0.1:5555/planned_trips'),
          fetch('http://127.0.0.1:5555/destinations'),
          fetch('http://127.0.0.1:5555/users'),
        ]);
        setBookedTrips(await tripsRes.json());
        setDestinations(await destsRes.json());
        setUsers(await usersRes.json());
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [role, navigate]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5555/planned_trips/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setBookedTrips(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const getDestination = (destId) =>
    destinations.find(d => d.id === destId) || { name: 'Unknown' };

  const getUser = (userId) =>
    users.find(u => u.id === userId) || null;

  const getInitials = (user) =>
    user ? `${user.first_name[0]}${user.last_name[0]}` : '?';

  const getStatus = (start, end) => {
    const today = new Date();
    const s = new Date(start);
    const e = new Date(end);
    if (today < s) return { label: 'Upcoming', type: 'upcoming' };
    if (today > e) return { label: 'Completed', type: 'past' };
    return { label: 'Active', type: 'active' };
  };

  const getDuration = (start, end) => {
    const nights = Math.round((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
    return `${nights} night${nights !== 1 ? 's' : ''}`;
  };

  const fmtDate = (str) =>
    new Date(str).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const active = bookedTrips.filter(t => getStatus(t.start_date, t.end_date).type === 'active').length;
  const upcoming = bookedTrips.filter(t => getStatus(t.start_date, t.end_date).type === 'upcoming').length;
  const past = bookedTrips.filter(t => getStatus(t.start_date, t.end_date).type === 'past').length;

  return (
    <Page>
      <TopBar>
        <div>
          <PageTitle>Bon Voyage</PageTitle>
          <PageSub>Admin view — all booked trips</PageSub>
        </div>
      </TopBar>

      <StatsRow>
        <Stat><StatLabel>Total trips</StatLabel><StatValue>{bookedTrips.length}</StatValue></Stat>
        <Stat><StatLabel>Active now</StatLabel><StatValue>{active}</StatValue></Stat>
        <Stat><StatLabel>Upcoming</StatLabel><StatValue>{upcoming}</StatValue></Stat>
        <Stat><StatLabel>Completed</StatLabel><StatValue>{past}</StatValue></Stat>
      </StatsRow>

      <SectionHead>
        <SectionTitle>Booked trips</SectionTitle>
        <CountBadge>{bookedTrips.length} trip{bookedTrips.length !== 1 ? 's' : ''}</CountBadge>
      </SectionHead>

      {bookedTrips.length > 0 ? (
        <TripGrid>
          {bookedTrips.map(trip => {
            const dest = getDestination(trip.destination_id);
            const user = getUser(trip.user_id);
            const status = getStatus(trip.start_date, trip.end_date);
            const duration = getDuration(trip.start_date, trip.end_date);

            return (
              <TripCard key={trip.id}>
                <CardTop>
                  <CardRow>
                    <DestName>{dest.name}</DestName>
                    <StatusBadge $type={status.type}>{status.label}</StatusBadge>
                  </CardRow>
                  <UserRow>
                    <Avatar>{getInitials(user)}</Avatar>
                    <UserName>{user ? `${user.first_name} ${user.last_name}` : 'Unknown'}</UserName>
                  </UserRow>
                  <DatesRow>
                    <DateBlock>
                      <DateLabel>Departure</DateLabel>
                      <DateValue>{fmtDate(trip.start_date)}</DateValue>
                    </DateBlock>
                    <DateBlock>
                      <DateLabel>Return</DateLabel>
                      <DateValue>{fmtDate(trip.end_date)}</DateValue>
                    </DateBlock>
                  </DatesRow>
                  <DurationRow>
                    <DurationBar><DurationFill /></DurationBar>
                    <DurationText>{duration}</DurationText>
                  </DurationRow>
                </CardTop>
                <CardFooter>
                  <FooterBtn onClick={() => alert(`Edit trip #${trip.id}`)}>Edit</FooterBtn>
                  <FooterBtn $danger onClick={() => handleDelete(trip.id)}>Delete</FooterBtn>
                </CardFooter>
              </TripCard>
            );
          })}
        </TripGrid>
      ) : (
        <Empty>No trips booked yet.</Empty>
      )}
    </Page>
  );
}

/* ── Styled Components ── */

const Page = styled.section`
  padding: 2rem 0;
`;

const TopBar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 600;
`;

const PageSub = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-top: 2px;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 2rem;

  @media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); }
`;

const Stat = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

const CountBadge = styled.span`
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 100px;
  background: #f3f4f6;
  color: #6b7280;
`;

const TripGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const TripCard = styled.div`
  background: #fff;
  border: 0.5px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.15s;

  &:hover { border-color: #9ca3af; }
`;

const CardTop = styled.div`
  padding: 1rem 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const CardRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

const DestName = styled.h3`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
`;

const statusColors = {
  upcoming: { bg: '#eff6ff', color: '#1d4ed8' },
  active:   { bg: '#ecfdf5', color: '#065f46' },
  past:     { bg: '#f9fafb', color: '#6b7280' },
};

const StatusBadge = styled.span`
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 100px;
  white-space: nowrap;
  flex-shrink: 0;
  background: ${p => statusColors[p.$type]?.bg};
  color: ${p => statusColors[p.$type]?.color};
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  flex-shrink: 0;
`;

const UserName = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const DatesRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 4px;
`;

const DateBlock = styled.div`
  background: #f9fafb;
  border-radius: 6px;
  padding: 8px 10px;
`;

const DateLabel = styled.div`
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const DateValue = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

const DurationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
`;

const DurationBar = styled.div`
  flex: 1;
  height: 3px;
  background: #e5e7eb;
  border-radius: 100px;
  overflow: hidden;
`;

const DurationFill = styled.div`
  height: 100%;
  width: 60%;
  background: #374151;
  border-radius: 100px;
`;

const DurationText = styled.span`
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 1rem;
  border-top: 0.5px solid #f3f4f6;
`;

const FooterBtn = styled.button`
  flex: 1;
  height: 28px;
  font-size: 12px;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  font-family: inherit;
  border: 0.5px solid ${p => p.$danger ? '#fca5a5' : '#e5e7eb'};
  color: ${p => p.$danger ? '#dc2626' : '#374151'};

  &:hover {
    background: ${p => p.$danger ? '#fef2f2' : '#f9fafb'};
  }
`;

const Empty = styled.div`
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
  font-size: 14px;
  border: 0.5px solid #e5e7eb;
  border-radius: 12px;
`;
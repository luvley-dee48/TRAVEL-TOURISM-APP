import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ICONS = ['🏝', '🏔', '🌆', '🌴', '🗼', '🏜', '🌊', '🗺'];

export default function Destination() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [newDestination, setNewDestination] = useState({ name: '', region: '', description: '', image_url: '' });
  const [editDestination, setEditDestination] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    setUserRole(role);
    fetch('http://127.0.0.1:5555/destinations')
      .then(res => res.json())
      .then(data => { setDestinations(data); setFilteredDestinations(data); })
      .catch(err => console.error(err));
  }, []);

  const applyFilters = (list, region, search) => {
    return list.filter(d => {
      const regionOk = region === 'All' || d.region === region;
      const searchOk = !search.trim() || d.name.toLowerCase().includes(search.toLowerCase());
      return regionOk && searchOk;
    });
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setFilteredDestinations(applyFilters(destinations, activeRegion, val));
  };

  const handleFilterChip = (region) => {
    setActiveRegion(region);
    setFilteredDestinations(applyFilters(destinations, region, searchTerm));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editDestination) {
      setEditDestination({ ...editDestination, [name]: value });
    } else {
      setNewDestination({ ...newDestination, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editDestination) {
      fetch(`http://127.0.0.1:5555/destinations/${editDestination.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editDestination),
      })
        .then(res => res.json())
        .then(data => {
          const updated = destinations.map(d => d.id === data.id ? data : d);
          setDestinations(updated);
          setFilteredDestinations(applyFilters(updated, activeRegion, searchTerm));
          cancelForm();
        })
        .catch(err => console.error(err));
    } else {
      fetch('http://127.0.0.1:5555/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDestination),
      })
        .then(res => res.json())
        .then(data => {
          const updated = [...destinations, data];
          setDestinations(updated);
          setFilteredDestinations(applyFilters(updated, activeRegion, searchTerm));
          cancelForm();
        })
        .catch(err => console.error(err));
    }
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5555/destinations/${id}`, { method: 'DELETE' })
      .then(() => {
        const updated = destinations.filter(d => d.id !== id);
        setDestinations(updated);
        setFilteredDestinations(applyFilters(updated, activeRegion, searchTerm));
      })
      .catch(err => console.error(err));
  };

  const startEditing = (destination) => {
    setEditDestination(destination);
    setFormVisible(true);
  };

  const cancelForm = () => {
    setFormVisible(false);
    setEditDestination(null);
    setNewDestination({ name: '', region: '', description: '', image_url: '' });
  };

  const handleShare = (destination) => {
    if (navigator.share) {
      navigator.share({ title: destination.name, text: destination.description, url: destination.image_url })
        .catch(err => console.error(err));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const regions = ['All', ...Array.from(new Set(destinations.map(d => d.region).filter(Boolean)))];

  return (
    <Page>
      <TopBar>
        <PageTitle>Destinations</PageTitle>
        <TopBarRight>
          <SearchWrap>
            <SearchInput
              type="text"
              placeholder="Search destinations…"
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchWrap>
          {userRole === 'admin' && (
            <PrimaryBtn onClick={() => { setFormVisible(prev => !prev); setEditDestination(null); }}>
              {formVisible && !editDestination ? 'Cancel' : '+ Add destination'}
            </PrimaryBtn>
          )}
        </TopBarRight>
      </TopBar>

      <StatsRow>
        <StatCard>
          <StatLabel>Total</StatLabel>
          <StatValue>{destinations.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Regions</StatLabel>
          <StatValue>{new Set(destinations.map(d => d.region).filter(Boolean)).size}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Featured</StatLabel>
          <StatValue>{destinations.filter(d => d.featured).length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Showing</StatLabel>
          <StatValue>{filteredDestinations.length}</StatValue>
        </StatCard>
      </StatsRow>

      {formVisible && userRole === 'admin' && (
        <AddPanel onSubmit={handleSubmit}>
          <PanelTitle>{editDestination ? 'Edit destination' : 'Add destination'}</PanelTitle>
          <Field>
            <label>Name</label>
            <input type="text" name="name" placeholder="e.g. Kyoto, Japan"
              value={editDestination ? editDestination.name : newDestination.name}
              onChange={handleChange} />
          </Field>
          <Field>
            <label>Region</label>
            <input type="text" name="region" placeholder="e.g. Asia"
              value={editDestination ? editDestination.region : newDestination.region}
              onChange={handleChange} />
          </Field>
          <Field>
            <label>Description</label>
            <textarea name="description" placeholder="Short description…"
              value={editDestination ? editDestination.description : newDestination.description}
              onChange={handleChange} />
          </Field>
          <Field>
            <label>Image URL</label>
            <input type="text" name="image_url" placeholder="https://…"
              value={editDestination ? editDestination.image_url : newDestination.image_url}
              onChange={handleChange} />
          </Field>
          <FormActions>
            <GhostBtn type="button" onClick={cancelForm}>Cancel</GhostBtn>
            <PrimaryBtn type="submit">{editDestination ? 'Save changes' : 'Add destination'}</PrimaryBtn>
          </FormActions>
        </AddPanel>
      )}

      <FilterRow>
        {regions.map(region => (
          <FilterChip
            key={region}
            $active={activeRegion === region}
            onClick={() => handleFilterChip(region)}
          >
            {region}
          </FilterChip>
        ))}
        <FilterCount>{filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}</FilterCount>
      </FilterRow>

      {filteredDestinations.length > 0 ? (
        <Grid>
          {filteredDestinations.map((destination, i) => (
            <Card key={destination.id}>
              {destination.image_url
                ? <CardImg src={destination.image_url} alt={destination.name} onError={e => e.target.style.display = 'none'} />
                : <CardImgPlaceholder>{ICONS[i % ICONS.length]}</CardImgPlaceholder>
              }
              <CardBody>
                <CardHeader>
                  <CardName>{destination.name}</CardName>
                  {destination.region && <RegionBadge>{destination.region}</RegionBadge>}
                </CardHeader>
                {destination.featured && <FeaturedTag>★ Featured</FeaturedTag>}
                <CardDesc>{destination.description}</CardDesc>
              </CardBody>
              <CardFooter>
                {userRole === 'admin' ? (
                  <>
                    <FooterBtn onClick={() => startEditing(destination)}>Edit</FooterBtn>
                    <FooterBtn $danger onClick={() => handleDelete(destination.id)}>Delete</FooterBtn>
                  </>
                ) : (
                  <FooterBtn onClick={() => handleShare(destination)}>Share</FooterBtn>
                )}
              </CardFooter>
            </Card>
          ))}
        </Grid>
      ) : (
        <Empty>No destinations match your search.</Empty>
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
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const PageTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 600;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  padding: 0 12px;
  height: 36px;
  font-size: 14px;
  outline: none;
  width: 220px;
`;

const PrimaryBtn = styled.button`
  height: 36px;
  padding: 0 14px;
  background: #111827;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  &:hover { opacity: 0.85; }
`;

const GhostBtn = styled.button`
  height: 36px;
  padding: 0 14px;
  background: transparent;
  color: #374151;
  border: 0.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  &:hover { background: #f9fafb; }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
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

const AddPanel = styled.form`
  background: #fff;
  border: 0.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 4px;
  }

  input, textarea {
    width: 100%;
    border: 0.5px solid #e5e7eb;
    border-radius: 8px;
    padding: 0 12px;
    height: 36px;
    font-size: 14px;
    color: #111827;
    background: #fff;
    font-family: inherit;
    outline: none;

    &:focus { border-color: #9ca3af; }
  }

  textarea {
    height: 80px;
    padding: 8px 12px;
    resize: vertical;
  }
`;

const PanelTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Field = styled.div`
  margin-bottom: 12px;
`;

const FormActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 4px;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterChip = styled.button`
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 13px;
  cursor: pointer;
  border: 0.5px solid ${p => p.$active ? '#111827' : '#e5e7eb'};
  background: ${p => p.$active ? '#111827' : '#fff'};
  color: ${p => p.$active ? '#fff' : '#6b7280'};

  &:hover {
    background: ${p => p.$active ? '#111827' : '#f9fafb'};
    color: ${p => p.$active ? '#fff' : '#111827'};
  }
`;

const FilterCount = styled.span`
  font-size: 12px;
  color: #9ca3af;
  margin-left: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const Card = styled.div`
  background: #fff;
  border: 0.5px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.15s ease;

  &:hover { border-color: #9ca3af; }
`;

const CardImg = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
`;

const CardImgPlaceholder = styled.div`
  width: 100%;
  height: 160px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

const CardName = styled.h2`
  font-size: 15px;
  font-weight: 600;
`;

const RegionBadge = styled.span`
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 100px;
  background: #f3f4f6;
  color: #6b7280;
  white-space: nowrap;
  flex-shrink: 0;
`;

const FeaturedTag = styled.span`
  display: inline-flex;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 100px;
  background: #ecfdf5;
  color: #065f46;
  width: fit-content;
`;

const CardDesc = styled.p`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 1rem;
  border-top: 0.5px solid #f3f4f6;
`;

const FooterBtn = styled.button`
  flex: 1;
  height: 30px;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
  border: 0.5px solid ${p => p.$danger ? '#fca5a5' : '#e5e7eb'};
  background: transparent;
  color: ${p => p.$danger ? '#dc2626' : '#374151'};

  &:hover {
    background: ${p => p.$danger ? '#fef2f2' : '#f9fafb'};
  }
`;

const Empty = styled.p`
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
  font-size: 14px;
`;
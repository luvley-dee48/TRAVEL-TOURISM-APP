import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    profile_pic: '',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://127.0.0.1:5555/users');
    const data = await response.json();
    setUsers(data);
  };

  const addUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error('Failed to add user');
      const data = await response.json();
      setUsers([...users, data]);
      resetNewUserForm();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const resetNewUserForm = () => {
    setNewUser({ username: '', email: '', password: '', profile_pic: '' });
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingUser),
      });
      if (!response.ok) throw new Error('Failed to edit user');
      const updatedUser = await response.json();
      setUsers(users.map(user => (user.id === id ? updatedUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const startEditingUser = (user) => {
    setEditingUser({ ...user });
  };

  const cancelEditing = () => {
    setEditingUser(null);
  };

  return (
    <StyledSection>
      <Title>
        <h2>Users Management</h2>
        <Button onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? 'Hide Form' : 'Add User'}
        </Button>
      </Title>
      {isFormVisible && (
        <AddUserForm>
          <h2>Add New User</h2>
          <InputContainer>
            <label>Username:</label>
            <input
              type='text'
              name='username'
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <label>Password:</label>
            <input
              type='password'
              name='password'
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <label>Profile Picture URL:</label>
            <input
              type='text'
              name='profile_pic'
              value={newUser.profile_pic}
              onChange={(e) => setNewUser({ ...newUser, profile_pic: e.target.value })}
            />
          </InputContainer>
          <Button onClick={addUser}>Add User</Button>
        </AddUserForm>
      )}
      <UserContainer>
        {users.map(user => (
          <UserCard key={user.id}>
            <UserInfo>
              {editingUser && editingUser.id === user.id ? (
                <>
                  <InputContainer>
                    <label>Username:</label>
                    <input
                      type='text'
                      name='username'
                      value={editingUser.username || ''} // Default to empty string
                      onChange={handleEditInputChange}
                    />
                  </InputContainer>
                  <InputContainer>
                    <label>Email:</label>
                    <input
                      type='email'
                      name='email'
                      value={editingUser.email || ''} // Default to empty string
                      onChange={handleEditInputChange}
                    />
                  </InputContainer>
                  <InputContainer>
                    <label>Password:</label>
                    <input
                      type='password'
                      name='password'
                      value={editingUser.password || ''} // Default to empty string
                      onChange={handleEditInputChange}
                    />
                  </InputContainer>
                  <InputContainer>
                    <label>Profile Picture URL:</label>
                    <input
                      type='text'
                      name='profile_pic'
                      value={editingUser.profile_pic || ''} // Default to empty string
                      onChange={handleEditInputChange}
                    />
                  </InputContainer>
                  <Button onClick={() => editUser(user.id)}>Save</Button>
                  <Button onClick={cancelEditing}>Cancel</Button>
                </>
              ) : (
                <>
                  <ProfilePicture src={user.profile_pic} alt={`${user.username}'s profile`} />
                  <h3>{user.username}</h3>
                  <p>Email: {user.email}</p>
                  <Button onClick={() => startEditingUser(user)}>Edit</Button>
                  <Button onClick={() => deleteUser(user.id)}>Delete</Button>
                </>
              )}
            </UserInfo>
          </UserCard>
        ))}
      </UserContainer>
    </StyledSection>
  );
};

export default Users;

// Styled Components
const StyledSection = styled.section`
  margin: 5rem 0;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const UserCard = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
    color: #555;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddUserForm = styled.div`
  background-color: #f0f0f0;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    margin-bottom: 1rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.5rem;
    color: #333;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

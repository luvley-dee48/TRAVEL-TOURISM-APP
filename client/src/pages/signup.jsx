import React, { useState } from 'react';
import styled from 'styled-components';

export default function SignupForm({ closeForm }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5555/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: name,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Signup successful!');
                closeForm(); // Close the form on successful signup
            } else {
                alert(data.message || 'Signup failed.'); // Display error message
            }
        } catch (error) {
            alert('An error occurred. Please try again.'); // Handle network errors
        }
    };

    return (
        <FormContainer>
            <FormTitle>Signup</FormTitle>
            <Form onSubmit={handleSubmit}>
                <Label>Name</Label>
                <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Label>Email</Label>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Label>Password</Label>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <SubmitButton type="submit">Signup</SubmitButton>
                <CloseButton onClick={closeForm}>Close</CloseButton>
            </Form>
        </FormContainer>
    );
}

const FormContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const FormTitle = styled.h2`
    margin-bottom: 1rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
`;

const SubmitButton = styled.button`
    padding: 0.5rem;
    background-color: #48cae4;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-bottom: 1rem;

    &:hover {
        background-color: #023e8a;
    }
`;

const CloseButton = styled.button`
    padding: 0.5rem;
    background-color: #ccc;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
        background-color: #999;
    }
`;

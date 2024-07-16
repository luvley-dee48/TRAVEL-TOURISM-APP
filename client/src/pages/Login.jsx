import React from 'react';
import styled from 'styled-components';

export default function LoginForm({ closeForm }) {
    return (
        <FormContainer>
            <FormTitle>Login</FormTitle>
            <Form>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your email" />
                <Label>Password</Label>
                <Input type="password" placeholder="Enter your password" />
                <SubmitButton type="submit">Login</SubmitButton>
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

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginForm({ onLogin }) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Username is required'),
            password: Yup.string()
                .required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            const opts = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            };
            try {
                const resp = await fetch("http://127.0.0.1:5555/login", opts);
                if (resp.status !== 200) {
                    setErrors({ submit: "There has been some error" });
                    setSubmitting(false);
                    return false;
                }
                const data = await resp.json();
                console.log("This came from the backend", data);
                sessionStorage.setItem("token", data.access_token);
                sessionStorage.setItem("role", data.role); // Store the user's role
                onLogin(); // Notify that the user is authenticated
                navigate("/"); // Redirect to the homepage
                return true;
            } catch (error) {
                console.log("There has been an error in logging in");
                setErrors({ submit: "There has been an error logging in" });
                setSubmitting(false);
                return false;
            }
        },
    });

    return (
        <FormContainer>
            <FormTitle>Login</FormTitle>
            <Form onSubmit={formik.handleSubmit}>
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    {...formik.getFieldProps('username')}
                />
                {formik.touched.username && formik.errors.username ? (
                    <ErrorMessage>{formik.errors.username}</ErrorMessage>
                ) : null}

                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <ErrorMessage>{formik.errors.password}</ErrorMessage>
                ) : null}

                {formik.errors.submit && <ErrorMessage>{formik.errors.submit}</ErrorMessage>}

                <SubmitButton type="submit" disabled={formik.isSubmitting}>
                    Login
                </SubmitButton>
            </Form>
            <SignupLink>
                Don't have an account? <Link to="/sign-up">Sign up</Link>
            </SignupLink>
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

const ErrorMessage = styled.p`
    color: red;
    margin-bottom: 1rem;
`;

const SignupLink = styled.p`
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;

    a {
        color: #007bff;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

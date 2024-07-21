import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Services from "./pages/services";
import Users from "./pages/users";
import SignupForm from "./pages/signup";
import Destinations from "./pages/destinations";
import Reviews from "./pages/reviews";
import LoginForm from "./pages/Login";
import PlannedTrips from "./pages/trips";
import ViewTrips from "./pages/viewtrips";
import Admin from "./pages/Admin";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
      <Route path="/sign-up" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm onLogin={() => setIsAuthenticated(true)} />} />
        {!isAuthenticated ? (
          <Route path="/" element={<LoginForm onLogin={() => setIsAuthenticated(true)} />} />
          
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/users" element={<Users />} />
            <Route path="/trips" element={<PlannedTrips />} />
            <Route path="/viewtrips" element={<ViewTrips />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/reviews" element={<Reviews />} />

            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/admin" element={<Admin />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

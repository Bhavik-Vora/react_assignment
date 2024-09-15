// components/Auth/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to get the token from cookies
export const getTokenFromCookies = () => {
  const token = document.cookie.split('; ').find(row => row.startsWith('todotoken='));
  return token ? token.split('=')[1] : null;
};

const PublicRoute = ({ children }) => {
  const token = getTokenFromCookies();

  // If token exists, redirect to home; otherwise, allow access to the page
  return !token ? children : <Navigate to="/" />;
};

export default PublicRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to get the token from cookies
const getTokenFromCookies = () => {
  const token = document.cookie.split('; ').find(row => row.startsWith('todotoken='));
  return token ? token.split('=')[1] : null;
};

const PrivateRoute = ({ children }) => {
  const token = getTokenFromCookies();

  // If token exists, allow access to the page; otherwise, redirect to login
  return token ? children : <Navigate to="/login" />;


};

export default PrivateRoute;

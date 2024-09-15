import React from 'react';
import { Navigate } from 'react-router-dom';

export const getTokenFromCookies = () => {
  const token = document.cookie.split('; ').find(row => row.startsWith('todotoken='));
  return token ? token.split('=')[1] : null;
};

const PublicRoute = ({ children }) => {
  const token = getTokenFromCookies();

  return !token ? children : <Navigate to="/" />;
};

export default PublicRoute;

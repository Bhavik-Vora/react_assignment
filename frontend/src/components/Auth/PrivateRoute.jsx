import React from 'react';
import { Navigate } from 'react-router-dom';

const getTokenFromCookies = () => {
  const token = document.cookie.split('; ').find(row => row.startsWith('todotoken='));
  return token ? token.split('=')[1] : null;
};

const PrivateRoute = ({ children }) => {
  const token = getTokenFromCookies();

  return token ? children : <Navigate to="/login" />;


};

export default PrivateRoute;
